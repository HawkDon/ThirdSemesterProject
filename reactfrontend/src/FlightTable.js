import React, { Component } from 'react';

//const FlightDummyData = [{airplaneId:1, numberRegistration:"YR-BAC", productionLine:"Boeing 737 Classic", departureTime:"09:30AM", arrivalTime:"01:30PM", targetDestination:"Madrid", travellingFrom:"Denmark" }]
export default class FlightTable extends Component {
    render(){
        return (
            <div>
                {this.props.flights === "Fetching!!" ? 
                (
                <div>
                    <h2>Please wait while your data gets fetched...</h2>
                </div>
                ) : (
                <div>
                <table>
                    <thead>
                    <tr><th>Travelling from and to</th><th>Date and Time of Departure</th><th>Date and Time of Arrival</th><th>Production Line</th><th>Price</th></tr>
                    </thead>
                    <tbody>
                        {this.props.flights}
                    </tbody>
                </table>
                <br/>
            </div>) }
            </div>
        )
    }
}
 