import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import FlightTable from './FlightTable';
import 'react-datepicker/dist/react-datepicker.css';
import {
  NavLink,
  Switch,
  Route
} from 'react-router-dom';
import FetchFactory from './FetchFactory';

function departureToArival (FlightData, getPrice) {
  console.log(FlightData);
  let i, o;
  var flightInformation = [];
  for (i = 0; i < FlightData.length; i++) {
    for (o = 0; o < FlightData[i].length; o++) {
      flightInformation.push(FlightData[i][0][o].map(res => res).concat(getPrice[i]));
    }
    o = 0;
  }
  return flightInformation;
}


export default class DateRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment('2018-05-10'),
      endDate: moment('2018-05-12'),
      flights: "Fetching!!",
      flightsWithPrice : ""
    }
  }
    
  handleSubmit = async () => {
    const from = document.getElementById("fraLufthavn").value;
    const to = document.getElementById("tilLufthavn").value;
    const endDate = this.state.endDate.format().slice(0,10);
    const startDate = this.state.startDate.format().slice(0, 10);
    
    //Get Price
    const getPrice = await FetchFactory.getFlights(from, to, startDate, endDate)
    .then(res => res.PricedItineraries.map(res => res.AirItineraryPricingInfo.PTC_FareBreakdowns.PTC_FareBreakdown.PassengerFare.TotalFare.Amount));

    //Get Information
    const getFlightDataStrings = await FetchFactory.getFlights(from, to, startDate, endDate)
    .then(res => res.PricedItineraries
    .map(res => res.AirItinerary.OriginDestinationOptions.OriginDestinationOption
    .map(res => res.FlightSegment
    .map(res => `${res.DepartureAirport.LocationCode} ${res.DepartureDateTime.slice(0,10)} ${res.DepartureDateTime.slice(11,19)} ${res.ArrivalAirport.LocationCode} ${res.ArrivalDateTime.slice(0,10)} ${res.ArrivalDateTime.slice(11,19)} ${res.MarketingAirline.Code}`))
    ))
    .catch(err => err);

    //Convert info to array
    const convertFlightDataToArray = getFlightDataStrings.map(res => res.map(res => res.map(res => res.split(" "))));

    //Implement price to the flight array
    const flightinformationWithPrice = await departureToArival(convertFlightDataToArray, getPrice);
console.log(flightinformationWithPrice + " flights hehe");
    let i = 0;
    let j = 0;    
    this.setState({
      flightsWithPrice: flightinformationWithPrice,
      flights: flightinformationWithPrice.map(res => <tr key={i}>{res.map(res => <td key={j++}>{res}</td>)}<td><input type="checkbox" name="myFlight" id={i++}/></td></tr>)
    });

    }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate
    endDate = endDate || this.state.endDate

    if (startDate.isAfter(endDate)) {
      endDate = startDate
    }

    this.setState({ startDate, endDate })
  }
  handleChangeStart = (startDate) => this.handleChange({ startDate })
  handleChangeEnd = (endDate) => this.handleChange({ endDate })

  render () {
    return (
      <div className="row">
      <form>
      <div className="column">
      <label> Start Dato
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart} />
          </label>
          <label> Slut Dato
        <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd} />
          </label>
      </div>
      <label>Fra Lufthavn : <input type="text" id="fraLufthavn" /> </label>
      <label>Til Lufthavn : <input type="text" id="tilLufthavn" /> </label>
      <NavLink className="btn btn-primary" onClick={this.handleSubmit} to={`${this.props.match.url}/FlightTable`}>Search fares</NavLink>
    </form>
    <Switch>
    <Route path={`${this.props.match.url}/FlightTable`} render={({match}) => <FlightTable match={match} flights={this.state.flights} flightsWithPrice={this.state.flightsWithPrice}/>} />
    </Switch>
    </div>
    );
  }
}