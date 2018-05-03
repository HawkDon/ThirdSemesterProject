/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogicFacade;

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

/**
 *
 * @author Oliver
 */
public class RestCalls {

    public static String getJsonFromFlightTravel(String endString) throws MalformedURLException, IOException {
        URL url = new URL(endString);
        
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.addRequestProperty("Authorization", "Bearer T1RLAQIptj4LbMuOpTEd/MF/5z8xLdep+RAUJq3ZF6ci1+mmVqOfL3CZAADA4ZPmsElev8PVfFddLNFjl+T0wtdEKKUIW4lRxvekUNec6ZDeosAa9jsBqRKy/1qejcmlcTBuxDu8E4qFUyryGFU08SCrk922NFmU7yokbzXMuZE+JTPQ5rfmvkNK0iqKoh8EojZYLVyauxguzTTG4a3wGXkrWOxP4GQF4ILmoluj7gc4CPisK2QAtS+iHxlOWoF52T2U3zuvYL813lWhfxqv5giJddlAsboopE4BRXX6AYn9cYJQkG+wY5NWW9kc");
        request.connect();
        
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonObject rootobj = root.getAsJsonObject(); //May be an array, may be an object. //just grab the zipcode
        return rootobj.toString();
    }
}