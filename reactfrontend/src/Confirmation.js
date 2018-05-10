import React, { Component } from 'react';
import {
    NavLink,
    Switch,
    Route
  } from 'react-router-dom';
import FlightTable from './FlightTable';

export default class Confirmation extends Component {
  
render(){
  
return(
<div>
<table id="FlightTableSelected">
                    <thead>
                    <tr><th>Travelling from</th><th>Date of Departure</th><th>Time of Departure</th><th>Target Destination</th><th>Date of Arrival</th><th>Time of Arrival</th><th>Production Line</th><th>Price</th><th>Choose flight</th></tr>
                    </thead>
                    <tbody>
                    {this.props.tableArr1}
                    </tbody>
                </table>
</div>
)
}
}