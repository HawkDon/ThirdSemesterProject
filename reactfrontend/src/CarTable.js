import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import ConfirmationCar from "./ConfirmationCar";

function CarTableElement(props) {
  if (props.carArray === "No available cars with your search criteria. Please try again") {
    return <h2>{props.carArray}</h2>;
  } else if (props.carArray.length > 0) {
    return (
      <div>
        <table id="CarTable">
          <thead>
            <tr>
              <th>Rental Company</th>
              <th>Car brand</th>
              <th>Car model</th>
              <th>Productions year</th>
              <th>Pick-up location</th>
              <th>Choose your car</th>
            </tr>
          </thead>
          <tbody>{props.carArray}</tbody>
        </table>
        <br />
        <NavLink
          className="btn btn-primary"
          onClick={props.onClick}
          to={props.to}
        >
          Confirm Selection
        </NavLink>
      </div>
    );
  }
}
export default class CarTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carArray: props.newCarArray,
      tableArr: ""
    };
  }
  handleSubmitData = event => {
    // Get values
    let checkboxes = document.getElementsByName("myCar");
    let table = document.getElementById("CarTable");

    //Assign new array variable for new table.
    let tableArr = [];

    for (let i = 0; i < checkboxes.length; i++) {
      //Get the specific button.
      let cb = checkboxes[i];

      //td table rows begins at 1. 0 is th.
      let j = i + 1;

      //Check if the button is pressed and render table.
      if (cb.checked === true) {
        tableArr.push({
          company: table.rows[j].cells[0].innerText,
          make: table.rows[j].cells[1].innerText,
          model: table.rows[j].cells[2].innerText,
          year: table.rows[j].cells[3].innerText,
          location: table.rows[j].cells[4].innerText
        });
      }
    }

    //Set state to render a table in confirmation
    this.setState({
      tableArr: tableArr.map((res, index) => (
        <tr key={index}>
          <td>{res.company}</td>
          <td>{res.make}</td>
          <td>{res.model}</td>
          <td>{res.year}</td>
          <td>{res.location}</td>
        </tr>
      ))
    });
  };
  render() {
    return (
      <form>
        <CarTableElement
          carArray={this.state.carArray}
          onClick={this.handleSubmitData}
          to={`${this.props.match.url}/ConfirmationCar`}
        />
        <br />
        <br />
        <Switch>
          <Route
            path={`${this.props.match.url}/ConfirmationCar`}
            render={({ match }) => (
              <ConfirmationCar match={match} tableArr={this.state.tableArr} />
            )}
          />
        </Switch>
      </form>
    );
  }
}
