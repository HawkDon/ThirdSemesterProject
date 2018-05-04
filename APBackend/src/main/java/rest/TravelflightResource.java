/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import LogicFacade.RestCalls;
import java.io.IOException;
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
 * @author Mathias BJ
 */
@Path("travelflight")
public class TravelflightResource {

    private final String TRAVEL = "https://api-crt.cert.havail.sabre.com/v2/shop/flights/fares?";
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of TravelflightResource
     */
    public TravelflightResource() {
    }

    /**
     * Retrieves representation of an instance of rest.TravelflightResource
     *
     * @param from
     * @param to
     * @param days
     * @param date
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/originlocation={from}&destination={to}&lengthofstay={days}&departuredate={date}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getJsonForCheapestTravelWithDays(@PathParam("from") String from, @PathParam("to") String to, @PathParam("days") String days, @PathParam("date") String date) throws IOException {

        String endString = TRAVEL + "origin=" + from + "&destination=" + to + "&lengthofstay=" + days + "&departuredate=" + date + "&pointofsalecountry=US";

        return RestCalls.getJsonFromFlightTravel(endString);
    }
    
    @GET
    @Path("/originlocation={from}&destination={to}&departuredate={startDate}&returndate={endDate}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getJsonForCheapestTravelWithDate(@PathParam("from") String from, @PathParam("to") String to, @PathParam("startDate") String startDate, @PathParam("endDate") String endDate) throws IOException {
        
        String endString = "https://api-crt.cert.havail.sabre.com/v2/shop/flights?" + "origin=" + from + "&destination=" + to + "&departuredate=" + startDate + "&returndate=" + endDate + "&pointofsalecountry=US";
       
        return RestCalls.getJsonFromFlightTravel(endString);
    }
    
    @GET
    @Path("/originlocation={from}&destination={to}&departuredate={startDate}&returndate={endDate}&sortby={category}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getJsonForTravel(@PathParam("from") String from, @PathParam("to") String to, @PathParam("startDate") String startDate, @PathParam("endDate") String endDate, @PathParam("category") String category) throws IOException {
                                                                                                                                                                                                                                                                                                              
        String endString = "https://api-crt.cert.havail.sabre.com/v1/shop/flights?" + "origin=" + from + "&destination=" + to + "&departuredate=" + startDate + "&returndate=" + endDate + "&onlineitinerariesonly=N&limit=20&offset=1&eticketsonly=N&sortby=" + category + "&order=asc&sortby2="+ category + "&order2=asc&pointofsalecountry=US";
       
        return RestCalls.getJsonFromFlightTravel(endString);
    }
}
