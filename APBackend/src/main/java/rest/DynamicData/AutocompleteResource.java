/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest.DynamicData;

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
@Path("autocomplete")
public class AutocompleteResource {

    private final String sURL = "http://aviation-edge.com/api/public/autocomplete?key=";
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AutocompleteResource
     */
    public AutocompleteResource() {
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirlinesWithIATAcode(@PathParam("id") String id) throws IOException, MalformedURLException {
        
        //To receive a response of possible options for autocomplete based on a query. 
        String qParameter = "&query=" + id;

        return RestCalls.getJsonObjectWithID(sURL, qParameter);
    }
}
