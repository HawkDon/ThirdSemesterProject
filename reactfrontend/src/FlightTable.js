import React, { Component } from 'react';

//const FlightDummyData = [{airplaneId:1, numberRegistration:"YR-BAC", productionLine:"Boeing 737 Classic", departureTime:"09:30AM", arrivalTime:"01:30PM", targetDestination:"Madrid", travellingFrom:"Denmark" }]
export default class FlightTable extends Component {
    render(){
        return (
            <div>
                <table>
                    <thead>
                    <tr><th>Travelling from</th><th>Time of Departure</th><th>Target Destination</th><th>Time of Arrival</th><th>Production Line</th><th>Choose your travel</th></tr>
                    </thead>
                    <tbody>
                        {this.props.flights}
                    </tbody>
                </table>
                <br/>
            </div>
        )}
    }
 