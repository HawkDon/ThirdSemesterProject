import React, { Component } from 'react';
import Bilsøgning from './Bilsøgning';
const CarDummyData = [{CarId: 1, registrationNumber:"99999", carBrand:"Volvo", carModel:"V70", rentalCompany:"Avis", pickupDestination:"Madrid", pickupDate:"20/7-2018", dropoffDate:"27/7-2018", price:"2000$" }]
export default class CarTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carArray: props.newCarArray
        }
    }
    render(){
        console.log("on carTable " + this.state.carArray)
        const mappingOfCars = this.state.carArray.map((car, index) => <tr key={index}><td>{car.company}</td><td>{car.make}</td><td>{car.model}</td><td>{car.year}</td><td>{car.location}</td><td><input type="radio" name="optradio"/></td></tr>)
        return(
            <div>
                <table>
                    <tr><th>Rental Company</th><th>Car brand</th><th>Car model</th><th>Productions year</th><th>Pick-up location</th><th>Choose your car</th></tr>
                    <tbody>
                        {mappingOfCars}
                    </tbody>
                </table>
                <br/>
                <input type="submit" value="Submit"/>

            </div>
        );
    }

}