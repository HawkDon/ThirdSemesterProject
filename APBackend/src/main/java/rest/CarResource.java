/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import LogicFacade.RestCalls;
import com.google.gson.Gson;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import java.io.IOException;

@Path("Car")
public class CarResource {
 Gson gson = new Gson();
    private final String TRAVEL = "https://stanitech.dk/carrentalapi/api/cars";
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of TravelflightResource
     */
    public CarResource() {
    }

    @GET
    @Path("/lejenbil")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCars() throws IOException {
     System.out.println(gson.toJson(TRAVEL) + "TRAVEL"); 
     return RestCalls.getJsonFromCars(TRAVEL);
    }
}
    