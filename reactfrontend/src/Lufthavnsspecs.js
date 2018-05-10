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
import Autocomplete from 'react-autocomplete';

function departureToArival (simpleArrayForFlightInformation, getPrice) {
  const arrayFlight = simpleArrayForFlightInformation.map(res => res.split(" "))
  return arrayFlight;
}

function handleResponse (res,index,arr) {
    return <tr key={index++}>
      <td>{res[0] + " -> " + res[3]}</td>
      <td>{res[1] + " " + res[2]}</td>
      <td>{res[4] + " " + res[5]}</td>
      <td>{res[6]}</td>
      </tr>
}

function simplifyArray (getFlightDataStrings) {
  let simpleArrayForFlightInformation = [];
  getFlightDataStrings
  .map(res => res
  .map(res => simpleArrayForFlightInformation.push(res.join(' '))))
  return simpleArrayForFlightInformation;
}

export default class DateRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment('2018-05-10'),
      endDate: moment('2018-05-12'),
      flights: "Fetching!!",
      airportcode1: "",
      airportcode2: ""
    }
  }
    
  handleSubmit = async () => {
    const from = this.state.airportcode1.slice(0,3);
    const to = this.state.airportcode2.slice(0,3);
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

    //Simplify the array
    const simplesimplifyArray = simplifyArray(getFlightDataStrings);

    //Implement price to the flight array
    const flightinformationWithPrice = departureToArival(simplesimplifyArray, getPrice);

    this.setState({
      flights: flightinformationWithPrice.map((res,index,arr) => handleResponse(res,index,arr))
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
      <form onSubmit={this.handleSubmit}>
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
      <label>Fra Lufthavn :
      <Autocomplete
      getItemValue={(item) => item.label}
      items={this.props.airportLabels}
      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
      renderItem={(item, isHighlighted) =>
      <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.label}
      </div>
      }
      value={this.state.airportcode1}
      onChange={(e) => this.setState({ airportcode1: e.target.value })}
      onSelect={(airportcode1) => this.setState({ airportcode1 })}
      />
      </label>
      <label>Til Lufthavn :  
      <Autocomplete   
      getItemValue={(item) => item.label}
      items={this.props.airportLabels}
      shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
      renderItem={(item, isHighlighted) =>
      <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.label}
      </div>
      }
      value={this.state.airportcode2}
      onChange={(e) => this.setState({ airportcode2: e.target.value })}
      onSelect={(airportcode2) => this.setState({ airportcode2 })}
      />
      </label>
      <NavLink className="btn btn-primary" onClick={this.handleSubmit} to={`${this.props.match.url}/FlightTable`}>Search fares</NavLink>
    </form>
    <Switch>
    <Route path={`${this.props.match.url}/FlightTable`} render={() => <FlightTable flights={this.state.flights}/>} />
    </Switch>
    </div>
    );
  }
}