import React, { Component } from 'react';
import Lufthavnsspecs from './Lufthavnsspecs';
import FetchFactory from './FetchFactory';

const FlightDummyData = [{airplaneId:1, numberRegistration:"YR-BAC", productionLine:"Boeing 737 Classic", departureTime:"09:30AM", arrivalTime:"01:30PM", targetDestination:"Madrid", travellingFrom:"Denmark" }]
export default class FlightTable extends Component {
    constructor() {
        super();
        this.state = {
            flights: "Fetching!"
        }
    }
    componentDidMount = () => {
        this.setState({
            flights: this.props.flights
        }, () => {
            console.log(this.state.flights)
            if(this.state.flights != "Fetching!") {
                this.state.flights.map(flight => <tr key={flight.AirItinerary.OriginDestinationOptions.OriginDestinationOption[0]}><td></td></tr>)
            } 
        })
    }
    render(){

        const mappingOfFlights = FlightDummyData.map(flight => <tr key={flight.airplaneId}><td>{flight.travellingFrom}</td><td>{flight.departureTime}</td><td>{flight.targetDestination}</td><td>{flight.arrivalTime}</td><td>{flight.productionLine}</td><td><input type="radio" name="optradio"/></td></tr>)
        return (
            <div>
        {this.state.flights == "Fetching!" ? (
            <div>
                Fetching....
            </div>
        ) : (
            <div>
                <table>
                    <tr><th>Traveling from</th><th>Time of Departure</th><th>Target Destination</th><th>Time of Arrival</th><th>Production Line</th><th>Choose your travel</th></tr>
                    <tbody>
                        {mappingOfFlights}
                    </tbody>
                </table>
                <br/>
            </div>
        )}
      </div>
    )
    }
}
 