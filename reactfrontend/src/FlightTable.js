import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Confirmation from "./Confirmation";


function FlightTableElement(props) {
  if (props.flights == "TypeError: Failed to fetch") {
    return (
      <h2>
        There is no result matching your search criteria. Please try another
        destination.
      </h2>
    );
  }
  return (
    <div>
      <table id="FlightTable">
        <thead>
          <tr>
            <th>Travelling from</th>
            <th>Travelling to</th>
            <th>Date of Departure</th>
            <th>Time of Departure</th>
            <th>Date of Arrival</th>
            <th>Time of Arrival</th>
            <th>Production Line</th>
            <th>Price</th>
            <th>Choose Flight</th>
          </tr>
        </thead>
        <tbody>{props.flights}</tbody>
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
export default class FlightTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableArr: ""
    };
  }
  handleSubmitData = async event => {
    // Get values
    const checkboxes = document.getElementsByName("myFlight");
    const table = document.getElementById("FlightTable");

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
          travelingFrom: table.rows[j].cells[0].innerText,
          travellingTo: table.rows[j].cells[1].innerText,
          dateOfDeparture: table.rows[j].cells[2].innerText,
          timeOfDeparture: table.rows[j].cells[3].innerText,
          dateOfArrival: table.rows[j].cells[4].innerText,
          timeOfArrival: table.rows[j].cells[5].innerText,
          productionLine: table.rows[j].cells[6].innerText,
          price: table.rows[j].cells[7].innerText
        });
      }
    }

    //Set state to render a table in confirmation
    this.setState({
      tableArr: tableArr.map((res, index) => (
        <tr key={index}>
          <td>{res.travelingFrom}</td>
          <td>{res.travellingTo}</td>
          <td>{res.dateOfDeparture}</td>
          <td>{res.timeOfDeparture}</td>
          <td>{res.dateOfArrival}</td>
          <td>{res.timeOfArrival}</td>
          <td>{res.productionLine}</td>
          <td>{res.price}</td>
        </tr>
      ))
    });
  };
  render() {
    return (
      <div>
        {this.props.flights === "Fetching!!" ? (
          <div>
            <h2>Please wait while your data gets fetched...</h2>
          </div>
        ) : (
          <div>
            <form>
              <FlightTableElement
                flights={this.props.flights}
                onClick={this.handleSubmitData}
                to={`${this.props.match.url}/Confirmation`}
              />
              <br />
              <br />
              <Switch>
                <Route
                  path={`${this.props.match.url}/Confirmation`}
                  render={({ match }) => (
                    <Confirmation
                      match={match}
                      tableArr1={this.state.tableArr}
                    />
                  )}
                />
              </Switch>
            </form>
          </div>
        )}
      </div>
    );
  }
}
