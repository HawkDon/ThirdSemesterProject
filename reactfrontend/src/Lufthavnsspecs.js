import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';

export default class DateRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment('2018-02-08'),
      endDate: moment('2018-02-10')
    }
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    var Bilmærke= document.getElementById("fraLufthavn").value;
    var Lejeområde = document.getElementById("tilLufthavn").value;
    var startDate = this.state.startDate.format();
    var endDate = this.state.endDate.format();
    console.log(startDate)
    console.log(endDate)
    console.log(endDate.indexOf("2018-02-10T00:00:00"));
    console.log(endDate.substring(0, endDate.length - 15));
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
            <form onSubmit={this.handleSubmit}>
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
      <input type="submit" value="Submit" />
    </form>
    </div>
    );
  }
}