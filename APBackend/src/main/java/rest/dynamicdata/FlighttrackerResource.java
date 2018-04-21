/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest.dynamicdata;

import LogicFacade.RestCalls;
import java.io.IOException;
import java.net.MalformedURLException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author Oliver
 */
@Path("flighttracker")
public class FlighttrackerResource {

    private final String sURL = "http://aviation-edge.com/api/public/flights?key=";

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of FlighttrackerResource
     */
    public FlighttrackerResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getInformationOfAllFlights() throws IOException, MalformedURLException {

        //For information about all flights in the world 
        return RestCalls.getJsonArray(sURL);
    }

    @GET
    @Path("/iatacode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getInformationOfSpecificFlightWithIATAnumber(@PathParam("id") String id) throws IOException, MalformedURLException {

        //For information about a specific flight based on: Flight IATA Number: 
        String qParameter = "flight[iataNumber]=" + id;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }

    @GET
    @Path("/countrycode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getInformationOfSpecificFlightWithAirlines(@PathParam("id") String id) throws IOException, MalformedURLException {

        //For information about a specific flight based on: Airlines: 
        String qParameter = "&airline[iataCode]=" + id;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }

    @GET
    @Path("/countrycode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getInformationOfDeparture(@PathParam("id") String id) throws IOException, MalformedURLException {

        //Departure location: 
        String qParameter = "&departure[iataCode]=" + id;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }

    @GET
    @Path("/countrycode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getInformationOfArrival(@PathParam("id") String id) throws IOException, MalformedURLException {

        //Arrival location: 
        String qParameter = "&arrival[iataCode]=" + id;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }
}
