import React, { Component } from 'react';
const CarDummyData = [{CarId: 1, registrationNumber:"99999", carBrand:"Volvo", carModel:"V70", rentalCompany:"Avis", pickupDestination:"Madrid", pickupDate:"20/7-2018", dropoffDate:"27/7-2018", price:"2000$" }]
export default class CarTable extends Component {
    render(){
        const mappingOfCars = CarDummyData.map(car => <tr key={car.CarId}><td>{car.carBrand}</td><td>{car.carModel}</td><td>{car.rentalCompany}</td><td>{car.pickupDestination}</td><td>{car.pickupDate}</td><td>{car.dropoffDate}</td><td>{car.price}</td><td><input type="radio" name="optradio"/></td></tr>)
        return(
            <div>
                <table>
                    <tr><th>Car brand</th><th>Car model</th><th>Rental Company</th><th>Pick-up location</th><th>Pick-up Date</th><th>Drop-off Date</th><th>Price</th><th>Choose your car</th></tr>
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