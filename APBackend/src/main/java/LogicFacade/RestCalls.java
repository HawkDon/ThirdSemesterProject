/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogicFacade;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 *
 * @author Oliver
 */
public class RestCalls {


    public static String getJsonFromFlightTravel(String endString) throws IOException {
        URL url = new URL(endString);
        
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.addRequestProperty("Authorization", "Bearer T1RLAQJUbWdB5ilO52HTIIYOLJrrjq84PRBBgCI7FmYP4/J7n4PFVWHgAADA5H5oe63IV9BqCfqubTeX52MUMojl2jmBvQypqdguB28Jme165SuMuyDy9CAKIyhPvJlxw4+0XRxvwiu2JzBaXFO8l43dnj5xP9xd6JqvNd/mcg9hDmxBt301Nyd24odDWuB3q6gczsR5+ACAScLuIrm23u9Ugb3VYc/LsvBfxk1IqE9QmFxMWR8CjH1q9OLRuSxD9wxB1JV5cxDbPwGpss0RUKAYFZqBfc7/Kg78C2oouSMdIaxPhFybxw1KZN/5");
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonObject rootObj = root.getAsJsonObject(); //May be an array, may be an object.
        return rootObj.toString();
    }
}

