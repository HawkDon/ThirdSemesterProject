import React, { Component } from 'react';
import Bilsøgning from './Bilsøgning';
import {
    NavLink,
    Switch,
    Route
  } from 'react-router-dom';
import ConfirmationCar from './ConfirmationCar';

export default class CarTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carArray: props.newCarArray,
            tableArr: "" 
        }
    }
    handleSubmitData = async (event) => {
        // Get values
        let checkboxes = document.getElementsByName("myCar");
        let table = document.getElementById("CarTable");

        //Assign new array variable for new table.
        let tableArr = [];

        for(let i = 0; i < checkboxes.length; i++){

            //Get the specific button.
            let cb = checkboxes[i];

            //td table rows begins at 1. 0 is th.
            let j = i + 1;

            //Check if the button is pressed and render table.
            if(cb.checked === true){
                    tableArr.push({
                    company: table.rows[j].cells[0].innerText,
                    make: table.rows[j].cells[1].innerText,
                    model: table.rows[j].cells[2].innerText,
                    year: table.rows[j].cells[3].innerText,
                    location: table.rows[j].cells[4].innerText,
                    
                });
    }
}

//Set state to render a table in confirmation
    this.setState({
    tableArr: tableArr.map((res, index) =>
    <tr key={index}><td>{res.company}</td>
    <td>{res.make}</td>
    <td>{res.model}</td>
    <td>{res.year}</td>
    <td>{res.location}</td>
    </tr>)
    });
    }
    render(){
        console.log("on carTable " + this.state.carArray)
        const mappingOfCars = this.state.carArray.map((car, index) => <tr key={index}><td>{car.company}</td><td>{car.make}</td><td>{car.model}</td><td>{car.year}</td><td>{car.location}</td><td><input type="checkbox" name="myCar"/></td></tr>)
        return(
            <form>
            <div>
                <table id="CarTable">
                    <tr><th>Rental Company</th><th>Car brand</th><th>Car model</th><th>Productions year</th><th>Pick-up location</th><th>Choose your car</th></tr>
                    <tbody>
                        {mappingOfCars}
                    </tbody>
                </table>
                <br/>
                <NavLink className="btn btn-primary" onClick={this.handleSubmitData} to={`${this.props.match.url}/ConfirmationCar`}>Confirm Selection</NavLink>
                <br/><br/>
                <Switch>
                <Route path={`${this.props.match.url}/ConfirmationCar`} render={({match}) => <ConfirmationCar match={match} tableArr={this.state.tableArr}/>}/>
                </Switch>
            </div>
            </form>
            
        );
    }

}