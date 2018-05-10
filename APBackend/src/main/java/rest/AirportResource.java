/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import JsonMessages.AirportCodes;
import LogicFacade.RestCalls;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author PC
 */
@Path("airport")
public class AirportResource {

    private final String SURL = "https://aviation-edge.com/api/public/airportDatabase?key=";

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AirportResource
     */
    public AirportResource() {
    }

    /**
     * Retrieves representation of an instance of rest.AirportResource
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirports() throws IOException {

        return RestCalls.getJsonFromiataAirportCodes(SURL);
    }

    @GET
    @Path("/labels")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAirportLabels() throws FileNotFoundException {
        
        //Get file from resources folder
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("jsonFile.txt").getFile());
        FileReader fr = new FileReader(file);
        
        
        Gson gson = new Gson(); //gson to parse variables
        
        Type listType = new TypeToken<List<AirportCodes>>() {
        }.getType();
        List<AirportCodes> res = gson.fromJson(fr, listType);

        return gson.toJson(res);
    }
}
