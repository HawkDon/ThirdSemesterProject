import React, { Component } from 'react';
import './App.css';
import Lufthavnsspecs from './Lufthavnsspecs';
import BilSøgning from './Bilsøgning';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'
import fetchFactory from './FetchFactory';
//import cars from './Dummydatacars.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      airportLabels: "",
      cars: ""
    }
  }
  componentDidMount() {
    fetchFactory.getLabelsForAirports()
    .then(res => this.setState({
      airportLabels: res,
    }))
    fetchFactory.getCars().then(res => this.setState({
      cars: res.cars,
    }))
    console.log("biler ", cars);
  }
  render() {
    return (

      <Router>
      <div>
        <Header/>
        <Switch>
        <Route exact path="/" />
        <Route path="/Flights" render={({match}) => <Lufthavnsspecs match={match} airportLabels={this.state.airportLabels}/>} />
        <Route path="/CarSearch" render={({match}) => <BilSøgning match={match} cars={this.state.cars}/>} />
        <Route component={NoMatch}/>
        </Switch>
        </div>
  </Router>
    );
  }
}
const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);
const Header = () => (

  <div>
  <ul className="header">
    <li><NavLink activeClassName="active" exact to="/Flights">Flyrejse</NavLink></li>
    <li><NavLink activeClassName="active" exact to="/CarSearch">Lej en bil</NavLink></li>
  </ul>
  </div>
)

export default App;
