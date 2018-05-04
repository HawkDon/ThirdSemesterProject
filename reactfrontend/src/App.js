import React, { Component } from 'react';
import './App.css';
import FlightTable from './FlightTable';
import Lufthavnsspecs from './Lufthavnsspecs';
import Bilsøgning from './Bilsøgning';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (

      <Router>
      <div>
        <Header/>
        <Switch>
        <Route exact path="/" />
        <Route path="/Flights" render={({match}) => <Lufthavnsspecs match={match}/>} />
        <Route path="/CarSearch" render={({match}) => <Bilsøgning match={match}/>} />
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
    <li><NavLink activeClassName="active" to="/Flights">Flyrejse</NavLink></li>
    <li><NavLink activeClassName="active" to="/CarSearch">Lej en bil</NavLink></li>
  </ul>
  </div>
)

export default App;
