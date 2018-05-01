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
@Path("timetables")
public class TimetablesResource {

    private final String sURL = "http://aviation-edge.com/api/public/timetable?key=";
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of TimetablesResource
     */
    public TimetablesResource() {
    }

    @GET
    @Path("/iatacode={id}&type={status}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getInformationOfArrivalFromCertainAirport(@PathParam("id") String id, @PathParam("status") String status ) throws IOException, MalformedURLException {
        
        //For the arrival timetable of a certain airport.
        
        String qParameter = "&iataCode=" + id + "&type=" + status;

        return RestCalls.getJsonArrayWithID(sURL, qParameter);
    }
}