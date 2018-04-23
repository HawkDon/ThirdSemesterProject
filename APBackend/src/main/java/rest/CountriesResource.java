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
@Path("countries")
public class CountriesResource {

    private final String sURL = "https://aviation-edge.com/api/public/countryDatabase?key=";
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CountriesResource
     */
    public CountriesResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllCountries() throws IOException, MalformedURLException {

        //For the entire database of countries. 

        return RestCalls.getJsonArray(sURL);
    }

    @GET
    @Path("/isocode={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCountryWithISOcode(@PathParam("id") String id) throws IOException, MalformedURLException {

        //For information about a specific country, you can search based on ISO code.
        
        String qParameter = "&codeIso2Country=" + id;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }

    @GET
    @Path("/countryname={id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCountryInformationWithCountryName(@PathParam("id") String id) throws IOException, MalformedURLException {

        //For the country information based on the country name.
        
        String qParameter = "&nameCountry=" + id;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }
}
