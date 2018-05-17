import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "react-autocomplete";
import CarTable from "./CarTable";
import { Route, NavLink, Switch } from "react-router-dom";
function filterCarArray(cars, location, make) {
  let newCarArray = [];
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].location === location && cars[i].make === make) {
      newCarArray.push(cars[i]);
    }
  }
  return newCarArray;
}

function filterUniqueArray(array) {
  const filteredArray = [...new Set(array)];
  return filteredArray;
}

export default class CarSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment("2018-05-20"),
      endDate: moment("2018-05-25"),
      locations: "",
      makes: "",
      newCarArray: ""
    };
  }

  getFilteredLocations = () => {
    const mapFilteredLocations = this.props.cars.map(item => item.location);
    const filteredLocations = filterUniqueArray(mapFilteredLocations);
    return filteredLocations;
  };

  getFilteredMakes = () => {
    let mapFilteredLocations = this.props.cars.map(item => item.make);
    const filteredMakes = filterUniqueArray(mapFilteredLocations);
    return filteredMakes;
  };

  handleSubmit = evt => {
    const location = this.state.locations;
    const make = this.state.makes;
    const cars = this.props.cars;

    const newCarArray = filterCarArray(cars, location, make);

    if (newCarArray.length === 0) {
      const carMessage =
        "No available cars with your search criteria. Please try again";
      this.setState({
        newCarArray: carMessage
      });
    } else if (newCarArray.length > 0) {
      const mappedArray = newCarArray.map((car, index) => (
        <tr key={index}>
          <td>{car.company}</td>
          <td>{car.make}</td>
          <td>{car.model}</td>
          <td>{car.year}</td>
          <td>{car.location}</td>
          <td>
            <input type="checkbox" name="myCar" />
          </td>
        </tr>
      ));
      this.setState({
        newCarArray: mappedArray
      });
    }
  };

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    if (startDate.isAfter(endDate)) {
      endDate = startDate;
    }

    this.setState({ startDate, endDate });
  };
  handleChangeStart = startDate => this.handleChange({ startDate });
  handleChangeEnd = endDate => this.handleChange({ endDate });

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="column">
            <label>
              {" "}
              Start Dato
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
              />
            </label>
            <label>
              {" "}
              Slut Dato
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
              />
            </label>
          </div>
          <label>
            {" "}
            Afhentningsted og afleveringsted :
            <Autocomplete
              getItemValue={item => item}
              items={this.getFilteredLocations()}
              shouldItemRender={(item, value) =>
                item.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              renderItem={(item, isHighlighted) => (
                <div
                  key={item}
                  style={{ background: isHighlighted ? "lightgray" : "white" }}
                >
                  {item}
                </div>
              )}
              value={this.state.locations}
              onChange={e => this.setState({ locations: e.target.value })}
              onSelect={locations => this.setState({ locations })}
            />
          </label>
          <label>
            Bilmærke :
            <Autocomplete
              getItemValue={item => item}
              items={this.getFilteredMakes()}
              shouldItemRender={(item, value) =>
                item.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              renderItem={(item, isHighlighted) => (
                <div
                  key={item}
                  style={{ background: isHighlighted ? "lightgray" : "white" }}
                >
                  {item}
                </div>
              )}
              value={this.state.makes}
              onChange={e => this.setState({ makes: e.target.value })}
              onSelect={makes => this.setState({ makes })}
            />
          </label>
          <NavLink
            className="btn btn-primary"
            onClick={this.handleSubmit}
            to={`${this.props.match.url}/CarTable`}
          >
            Search cars
          </NavLink>
        </form>
        <Switch>
          <Route
            path={`${this.props.match.url}/CarTable`}
            render={({ match }) => (
              <CarTable match={match} newCarArray={this.state.newCarArray} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
