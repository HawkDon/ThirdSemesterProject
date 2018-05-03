import React, { Component } from 'react';
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
        <Header />
        <Switch>
        <Route exact path="/" render={() => <Lufthavnsspecs />} />
        <Route path="/Bilsøgning" render={() => <Bilsøgning/>} />
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
    <li><NavLink exact activeClassName="active" to="/">Flyrejse</NavLink></li>
    <li><NavLink activeClassName="active" to="/Bilsøgning">Lej en bil</NavLink></li>
  </ul>
  </div>
)

export default App;
