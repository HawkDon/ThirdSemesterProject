/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import LogicFacade.RestCalls;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import javax.annotation.security.RolesAllowed;
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
@Path("airports")
public class AirportsResource {

    private final String sURL = "https://aviation-edge.com/api/public/airportDatabase?key=";
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AirportsResource
     */
    public AirportsResource() {
    }

    /**
     * Retrieves representation of an instance of
     * com.mycompany.apbackend.AirportsResource
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllAirports() throws IOException, MalformedURLException {
        
        //For the entire database of airports. 
        
        return RestCalls.getJsonArray(sURL);
    }

    @GET
    @Path("/iatacode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirportsWithIATAcode(@PathParam("id") String id) throws IOException, MalformedURLException {
        
        //For information about a specific airport, you can search based on IATA code. 
        
        String qParameter = "&codeIataAirport=" + id;
        
        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }
    
    @GET
    @Path("/countrycode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirportsWithCountryCode(@PathParam("id") String id) throws IOException, MalformedURLException {

        //For the airports based on the country code. 
        
        String qParameter = "&codeIso2Country=" + id;
        
        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }
}
