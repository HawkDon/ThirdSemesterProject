/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

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
@Path("airlinebenchmark")
public class AirlinebenchmarkResource {
    
    private final String sURL = "https://aviation-edge.com/api/public/benchmarkAirlines?key=";
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AirlinebenchmarkResource
     */
    public AirlinebenchmarkResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllAirlinesBenchmarks() throws IOException, MalformedURLException {
        
        //For the entire database of airlines benchmark. 

        return RestCalls.getJsonArray(sURL);
    }

    @GET
    @Path("/iatacode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirlinesBenchmarksWithIATAcode(@PathParam("id") String id) throws IOException, MalformedURLException {
        
        //For information about a specific airline benchmark information, you can search based on IATA airline code. 
        
        String qParameter = "&codeIataAirline=" + id;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }

    @GET
    @Path("/countrycode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirlinesBenchmarksWithCountryCode(@PathParam("id") String id) throws IOException, MalformedURLException {
        
        //For the airline benchmark information based on the country codes. 
        
        String qParameter = "&codeIso2Country=" + id;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }
}
