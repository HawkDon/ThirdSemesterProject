import React, { Component } from 'react';
import CarTable from './CarTable';

export default class ConfirmationCar extends Component {
  
render(){
  
return(
      <div>
        <table id="CarTableSelected">
          <thead>
          <tr><th>Company</th><th>Car brand</th><th>Car model</th><th>Production year</th><th>Pickup/dropoff destination</th></tr>
          </thead>
          <tbody>
          {this.props.tableArr}
          </tbody>
        </table>
      </div>
    )
  }
}