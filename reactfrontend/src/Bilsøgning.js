import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';
import Autocomplete from 'react-autocomplete';

export default class CarSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment('2018-05-20'),
      endDate: moment('2018-05-25'),
      locations: "",
      makes: ""
    }
    
  }

  handleSubmit = (evt) => {
    let date = new Date("1995-01-17");
    console.log(date);
    console.log(date.getMonth());
    evt.preventDefault();
    //var Bilmærke= document.getElementById("Bilmærke").value;
    //var Lejeområde = document.getElementById("Lejeområde").value;
    var startDate = this.state.startDate.format();
    var endDate = this.state.endDate.format();
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
      <label> Afhentningsted og afleveringsted :
        <Autocomplete
        getItemValue={(item) => item.location}
        items={this.props.cars}
        shouldItemRender={(item, value) => item.location.toLowerCase().indexOf(value.toLowerCase()) > -1}
        renderItem={(item, isHighlighted) =>
        <div key={item.location} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.location}
        </div>
      }
        value={this.state.locations}
        onChange={(e) => this.setState({ locations: e.target.value })}
        onSelect={(locations) => this.setState({ locations })}
        />
      </label>
      <label>Bilmærke :
        <Autocomplete
        getItemValue={(item) => item.make}
        items={this.props.cars}
        shouldItemRender={(item, value) => item.make.toLowerCase().indexOf(value.toLowerCase()) > -1}
        renderItem={(item, isHighlighted) =>
        <div key={item.make} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        {item.make}
        </div>
      }
        value={this.state.makes}
        onChange={(e) => this.setState({ makes: e.target.value })}
        onSelect={(makes) => this.setState({ makes })}
        />
        </label>
      <input type="submit" value="Submit"/>
    </form>
    </div>
    );
  }

}