import React, { Component } from 'react';

export default class Confirmation extends Component {
  
render(){
  
return(
      <div>
        <table id="FlightTableSelected">
          <thead>
          <tr><th>Travelling from</th><th>Travelling to</th><th>Date of Departure</th><th>Time of Departure</th><th>Date of Arrival</th><th>Time of Arrival</th><th>Production Line</th><th>Price</th></tr>
          </thead>
          <tbody>
          {this.props.tableArr1}
          </tbody>
        </table>
      </div>
    )
  }
}