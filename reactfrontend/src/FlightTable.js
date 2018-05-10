import React, { Component } from 'react';
import {
    NavLink,
    Switch,
    Route
  } from 'react-router-dom';
  import Confirmation from './Confirmation';

  //const FlightDummyData = [{airplaneId:1, numberRegistration:"YR-BAC", productionLine:"Boeing 737 Classic", departureTime:"09:30AM", arrivalTime:"01:30PM", targetDestination:"Madrid", travellingFrom:"Denmark" }]
  export default class FlightTable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tableArr1: "" 
        }
    }
        handleSubmitData = async (event) => {
            let checkboxes = document.getElementsByName("myFlight");
            let choosenFlights = [];
            
            for(var i = 0; i < checkboxes.length; i++){
                //console.log(document.getElementsByName("myFlight")[i].checked);
                let cb = checkboxes[i];         
                if(cb.checked === true){
                    choosenFlights.push(cb);
                    var tableArr = [];
                    var table = document.getElementById("FlightTable");
                    for ( var i = 1; i < table.rows.length; i++ ) {
                        tableArr.push({
                        travelingFrom: table.rows[i].cells[0].innerHTML,
                        dateOfDeparture: table.rows[i].cells[1].innerHTML,
                        timeOfDeparture: table.rows[i].cells[2].innerHTML,
                        targetDestination: table.rows[i].cells[3].innerHTML,
                        dateOfArrival: table.rows[i].cells[4].innerHTML,
                        timeOfArrival: table.rows[i].cells[5].innerHTML,
                        productionLine: table.rows[i].cells[6].innerHTML,
                        price: table.rows[i].cells[7].innerHTML,
                    });
                   
                    var tableArray = tableArr.map(res => <tr key={i}><td>{res.travelingFrom}</td><td>{res.timeOfDeparture}</td><td>{res.timeOfArrival}</td><td>{res.productionLine}</td><td>{res.price}</td><td>{res.dateOfDeparture}</td><td>{res.dateOfArrival}</td></tr>)
                    console.log("hej emdedf" + tableArray)
                this.setState({
                    tableArr1: tableArray
                  });
            }
            }
        }
            console.log(document.getElementById("FlightTable").rows[1]);
           // console.log(this.props.flightsWithPrice);
            console.log(choosenFlights);
            console.log(tableArr);
        }
    render(){
        return (
            <div>
                {this.props.flights === "Fetching!!" ? 
                (
                <div>
                    <h2>Please wait while your data gets fetched...</h2>
                </div>
                ) : (
                <div>
                    <form>
                <table id="FlightTable">
                    <thead>
                    <tr><th>Travelling from</th><th>Travelling to</th><th>Date of Departure</th><th>Time of Departure</th><th>Date of Arrival</th><th>Time of Arrival</th><th>Production Line</th><th>Price</th></tr>
                    </thead>
                    <tbody>
                        {this.props.flights}
                    </tbody>
                </table>
                <br/>
                <NavLink className="btn btn-primary" onClick={this.handleSubmitData} to={`${this.props.match.url}/Confirmation`}>Confirm Selection</NavLink>
                <Switch>
                <Route path={`${this.props.match.url}/Confirmation`} render={({match}) => <Confirmation match={match} tableArr1={this.props.tableArr1}/>}/>
                </Switch>
                </form>
            </div>) }

            </div>
        )
    }
}
 