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
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author Oliver
 */
@Path("airplanes")
public class AirplanesResource {

    private final String sURL = "https://aviation-edge.com/api/public/airplaneDatabase?key=";
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AirplanesResource
     */
    public AirplanesResource() {
    }

    /**
     * Retrieves representation of an instance of rest.AirplanesResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllAirplanes() throws IOException, MalformedURLException {

        //For the entire database of airplanes.

        return RestCalls.getJsonForAirplanes(sURL);
    }

    @GET
    @Path("/registrationcode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirplaneWithRegistration(@PathParam("id") String id) throws IOException, MalformedURLException {
        
        //For information about a specific airplane, you can search based on registration number. 

        String qParameter = "&numberRegistration=" + id;
        
        return RestCalls.getJsonForAirplanesWithID(sURL, qParameter);
    }
    
    @GET
    @Path("/hexicaocode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirplaneWithHexICAOCode(@PathParam("id") String id) throws IOException, MalformedURLException {
        
        //For the airplanes based on the hex ICAO code. 

        String qParameter = "&hexIcaoAirplane=" + id;
        
        return RestCalls.getJsonForAirplanesWithID(sURL, qParameter);
    }
    
    @GET
    @Path("/iatacode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirplanesWithIATAcode(@PathParam("id") String id) throws IOException, MalformedURLException {
        
        //For information about airplanes of a specific airline, you can search based on airline IATA code.

        String qParameter = "&codeIataAirline=" + id;
        
        return RestCalls.getJsonForAirplanesWithID(sURL, qParameter);
    }
}
