import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import FlightTable from './FlightTable';
import 'react-datepicker/dist/react-datepicker.css';
import {
  NavLink,
  Switch,
  Route
} from 'react-router-dom';
import FetchFactory from './FetchFactory';

export default class DateRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment('2018-05-10'),
      endDate: moment('2018-05-12'),
      flights: "Fetching!!"
    }
  }
    
  handleSubmit = (evt) => {
    var from= document.getElementById("fraLufthavn").value;
    var to = document.getElementById("tilLufthavn").value;
    var endDate = this.state.endDate.format().slice(0,10);
    var startDate = this.state.startDate.format().slice(0, 10);

    FetchFactory.getFlights(from, to, startDate, endDate).then(res => this.setState({
      flights: res.PricedItineraries
    }, () => {
      console.log(this.state.flights)
    }))
    }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate
    endDate = endDate || this.state.endDate

    if (startDate.isAfter(endDate)) {
      endDate = startDate
    }

    this.setState({ startDate, endDate })
  }
  handleChangeStart = (startDate) => this.handleChange({ startDate })
  handleChangeEnd = (endDate) => this.handleChange({ endDate })

  render () {
    return (
      <div className="row">
      <form>
      <div className="column">
      <label> Start Dato
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart} />
          </label>
          <label> Slut Dato
        <DatePicker
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd} />
          </label>
      </div>
      <label>Fra Lufthavn : <input type="text" id="fraLufthavn" /> </label>
      <label>Til Lufthavn : <input type="text" id="tilLufthavn" /> </label>
      <NavLink className="btn btn-primary" onClick={this.handleSubmit} to={`${this.props.match.url}/FlightTable`}>Search fares</NavLink>
    </form>
    <Switch>
    <Route path={`${this.props.match.url}/FlightTable`} render={() => <FlightTable flights={this.state.flights}/>} />
    </Switch>
    </div>
    );
  }
}