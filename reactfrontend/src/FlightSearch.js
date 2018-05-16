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

function flightDataObject(res){
  let obj = {
    from: res.DepartureAirport.LocationCode,
    to: res.ArrivalAirport.LocationCode,
    fromDate: res.DepartureDateTime.slice(0,10),
    toDate: res.DepartureDateTime.slice(0,10),
    fromTime: res.DepartureDateTime.slice(11,19),
    toTime: res.ArrivalDateTime.slice(11,19),
    productLine: res.MarketingAirline.Code
  }
  return obj;
}


function handleResponse(flightDataAndPrice){
  //To convert prices to table rows
  const handlePrice = flightDataAndPrice.map((res) => <td>{res[2]}</td>);

  let simpleDataTableDeparture = [];
  let simpleDataTableArrival = [];
  
  //To get departures to table rows and push it over in an empty array to simplify
  const flightDataTableDeparture = flightDataAndPrice.map(res => res.filter((res, index) => index === 0));
  
  flightDataTableDeparture.map(res => res.map(res => simpleDataTableDeparture.push(res)))
  
  //To get arrivals to table rows and push it over in an empty array to simplify
  const flightDataTableArrival = flightDataAndPrice.map(res => res.filter((res, index) => index === 1));

  flightDataTableArrival.map(res => res.map(res => simpleDataTableArrival.push(res)));

  //Convert to JSX
  let reactResponse = "";
  let index = 0;
//Continue from here.
  console.log(simpleDataTableDeparture[0][0].from);
  console.log(simpleDataTableArrival);
  for(let i; i < simpleDataTableDeparture.length; i++) {
    reactResponse += <tr key={index++}>
      <td>{simpleDataTableDeparture[i][0]}</td>
      <td>{simpleDataTableDeparture[i][0]}</td>
      <td>{simpleDataTableDeparture[i][0]}</td>
      <td>{simpleDataTableDeparture[i][0]}</td>
      <td>{simpleDataTableDeparture[i][0]}</td>
      <td>{simpleDataTableDeparture[i][0]}</td>
      <td>{simpleDataTableDeparture[i][0]}</td>
      <td><input type="checkbox" name="myFlight" id={index++}/></td>
      </tr>
  }
   console.log(reactResponse);
  return reactResponse;
}

export default class DateRange extends React.Component {
  constructor () {
    super()
    this.state = {
      startDate: moment('2018-07-07'),
      endDate: moment('2018-07-09'),
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
    
    let flightDepArr = []
    
    //To get price of airports
    const getPrice = await FetchFactory.getFlights(from, to, startDate, endDate)
    .then(res => res.PricedItineraries.map(res => res.AirItineraryPricingInfo.PTC_FareBreakdowns.PTC_FareBreakdown.PassengerFare.TotalFare.Amount));
    
    //To get information and pass it to our own array
    await FetchFactory.getFlights(from, to, startDate, endDate)
    .then(res => res.PricedItineraries
    .map(res => flightDepArr.push(res.AirItinerary.OriginDestinationOptions.OriginDestinationOption
    .map(res => res.FlightSegment
    .map(res => flightDataObject(res))))
    ))
    .catch(err => err);
    
    //To implement the price to the flightData array
    const flightDataAndPrice = flightDepArr.map((res, index) => res.concat(getPrice[index]));
    const flightDataTable = handleResponse(flightDataAndPrice);
    
    this.setState({
      flights: flightDataTable
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
    <Route path={`${this.props.match.url}/FlightTable`} render={({match}) => <FlightTable match={match} flights={this.state.flights}/>} />
    </Switch>
    </div>
    );
  }
}