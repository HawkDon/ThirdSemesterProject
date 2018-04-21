/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Oliver
 */
@javax.ws.rs.ApplicationPath("api")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(cors.CorsRequestFilter.class);
        resources.add(cors.CorsResponseFilter.class);
        resources.add(rest.AirlinebenchmarkResource.class);
        resources.add(rest.AirlinesResource.class);
        resources.add(rest.AirplanesResource.class);
        resources.add(rest.AirportbenchmarkResource.class);
        resources.add(rest.AirportsResource.class);
        resources.add(rest.CitiesResource.class);
        resources.add(rest.CitybenchmarkResource.class);
        resources.add(rest.CountriesResource.class);
        resources.add(rest.DynamicData.AutocompleteResource.class);
        resources.add(rest.DynamicData.FlighttrackerResource.class);
        resources.add(rest.DynamicData.TimetablesResource.class);
    }
    
}
