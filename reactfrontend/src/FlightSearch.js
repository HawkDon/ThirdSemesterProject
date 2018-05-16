import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import FlightTable from "./FlightTable";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink, Switch, Route } from "react-router-dom";
import FetchFactory from "./FetchFactory";
import Autocomplete from "react-autocomplete";

function flightDataObject(res) {

  let obj = {
    from: res.DepartureAirport.LocationCode,
    to: res.ArrivalAirport.LocationCode,
    fromDate: res.DepartureDateTime.slice(0, 10),
    toDate: res.DepartureDateTime.slice(0, 10),
    fromTime: res.DepartureDateTime.slice(11, 19),
    toTime: res.ArrivalDateTime.slice(11, 19),
    productLine: res.MarketingAirline.Code
  };

  return obj;
}
function getFinalFlightDataObject(getPrice, flightDataTableArrival, flightDataTableDeparture) {

  let obj = {
    from: flightDataTableDeparture[0].from,
    to: flightDataTableDeparture[flightDataTableDeparture.length-1].to,
    fromDate: flightDataTableDeparture[0].fromDate,
    toDate: flightDataTableDeparture[flightDataTableDeparture.length-1].toDate,
    fromTime: flightDataTableDeparture[0].fromTime,
    toTime: flightDataTableDeparture[flightDataTableDeparture.length-1].toTime,
    arrivals: [],
    departures: [],
    productLine: flightDataTableDeparture[0].productLine,
    price: getPrice,
    getArrivals : function(array) {
      array.forEach(element => {
        this.arrivals.push(element);
      });
   },
    getDepartures : function(array) {
      array.forEach(element => {
        this.departures.push(element)
      });
  }
  };

  obj.getArrivals(flightDataTableArrival);

  obj.getDepartures(flightDataTableDeparture);

  return obj;
}

function handleResponse(getPrice, flightData) {

  let simpleDataTableDeparture = [];
  let simpleDataTableArrival = [];

  //To get departures to table rows and push it over in an empty array to simplify
  const flightDataTableDeparture = flightData.map(res =>
    res.filter((res, index) => index === 0)
  );

  flightDataTableDeparture.map(res =>
    res.map(res => simpleDataTableDeparture.push(res))
  );

  //To get arrivals to table rows and push it over in an empty array to simplify
  const flightDataTableArrival = flightData.map(res =>
    res.filter((res, index) => index === 1)
  );

  flightDataTableArrival.map(res =>
    res.map(res => simpleDataTableArrival.push(res))
  );

  //To get the ultimate flightdata table
  let developerFlightTable = [];
  for(let i = 0; i < 20; i++) {
    developerFlightTable.push(getFinalFlightDataObject(getPrice[i], simpleDataTableArrival[i], simpleDataTableDeparture[i]))
  }

  //Convert to JSX elements
  const mappedFlightData = developerFlightTable.map( (res, index) => 
  <tr key={index}>
    <td>{res.from}</td>
    <td>{res.to}</td>
    <td>{res.fromDate}</td>
    <td>{res.fromTime}</td>
    <td>{res.toDate}</td>
    <td>{res.toTime}</td>
    <td>{res.productLine}</td>
    <td>{res.price}</td>
    <td><input type="checkbox" name="myFlight" id={index++}/></td>
  </tr>)

  return mappedFlightData;
}

export default class DateRange extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment("2018-07-07"),
      endDate: moment("2018-07-09"),
      flights: "Fetching!!",
      airportcode1: "",
      airportcode2: ""
    };
  }

  handleSubmit = async () => {
    const from = this.state.airportcode1.slice(0, 3);
    const to = this.state.airportcode2.slice(0, 3);
    const endDate = this.state.endDate.format().slice(0, 10);
    const startDate = this.state.startDate.format().slice(0, 10);

    //To get price of airports in a not processed array.
    const getPrice = await FetchFactory.getFlights(
      from,
      to,
      startDate,
      endDate
    ).then(res =>
      res.PricedItineraries.map(
        res =>
          res.AirItineraryPricingInfo.PTC_FareBreakdowns.PTC_FareBreakdown
            .PassengerFare.TotalFare.Amount
      )
    );

    let flightData = [];

    //To get information of airports in a not processed array.
    await FetchFactory.getFlights(from, to, startDate, endDate)
      .then(res =>
        res.PricedItineraries.map(res =>
          flightData.push(
            res.AirItinerary.OriginDestinationOptions.OriginDestinationOption.map(
              res => res.FlightSegment.map(res => flightDataObject(res))
            )
          )
        )
      )
      .catch(err => err);

    //to put the array into process.
    const flightDataTable = handleResponse(getPrice, flightData);

    
    this.setState({
      flights: flightDataTable
    });
  };

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.isAfter(endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  };
  handleChangeStart = startDate => this.handleChange({ startDate });
  handleChangeEnd = endDate => this.handleChange({ endDate });
  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="column">
            <label>
              {" "}
              Start Dato
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
              />
            </label>
            <label>
              {" "}
              Slut Dato
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
              />
            </label>
          </div>
          <label>
            Fra Lufthavn :
            <Autocomplete
              getItemValue={item => item.label}
              items={this.props.airportLabels}
              shouldItemRender={(item, value) =>
                item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.label}
                  style={{ background: isHighlighted ? "lightgray" : "white" }}
                >
                  {item.label}
                </div>
              )}
              value={this.state.airportcode1}
              onChange={e => this.setState({ airportcode1: e.target.value })}
              onSelect={airportcode1 => this.setState({ airportcode1 })}
            />
          </label>
          <label>
            Til Lufthavn :
            <Autocomplete
              getItemValue={item => item.label}
              items={this.props.airportLabels}
              shouldItemRender={(item, value) =>
                item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              renderItem={(item, isHighlighted) => (
                <div
                  key={item.label}
                  style={{ background: isHighlighted ? "lightgray" : "white" }}
                >
                  {item.label}
                </div>
              )}
              value={this.state.airportcode2}
              onChange={e => this.setState({ airportcode2: e.target.value })}
              onSelect={airportcode2 => this.setState({ airportcode2 })}
            />
          </label>
          <NavLink
            className="btn btn-primary"
            onClick={this.handleSubmit}
            to={`${this.props.match.url}/FlightTable`}
          >
            Search fares
          </NavLink>
        </form>
        <Switch>
          <Route
            path={`${this.props.match.url}/FlightTable`}
            render={({ match }) => (
              <FlightTable match={match} flights={this.state.flights} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
