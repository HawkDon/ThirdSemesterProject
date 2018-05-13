/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogicFacade;

import JsonMessages.AirportCodes;
import com.google.gson.*;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 *
 * @author Oliver
 */
public class RestCalls {

    public static String getJsonFromFlightTravel(String endString) throws IOException {
        URL url = new URL(endString);

        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.addRequestProperty("Authorization", "Bearer T1RLAQLFb90rkaBRokK4+kR8CJfHV1a9mBApdRVIGUmfmjdmPzdQOjB5AADAbvK+d4PpyZTMEc9J3oaheZRg2rvzLhASXH1gwBebyY7iYkD0QJzbvi1bkqiPHa7wDC7pXlHo5OGqyXySOFDdXfYDN2Ogdl9UTZ2UNkOU+kc2POtEKCbU9MSJjYBfYINglKT34uDffllkq9WrmRWxTlu0KJ+1bHwbC0dwMUzFUk3dLQhU1eD4h6ybCXvm9BNPnuosV6VujTlAycI9EuMU1UT6c2lmCaxdZXMTUD/KAHnSLaCVImXUTzIO73RdVNN/");
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonObject rootObj = root.getAsJsonObject(); //May be an array, may be an object.
        return rootObj.toString();
    }

    public static String getJsonFromiataAirportCodes(String SURL) throws IOException {
        //Aviation edge website fetch
        String key = "d66dff-0edac2-c9e092-beaa65-c41e3c";

        String finalString = SURL + key;
        URL url = new URL(finalString);
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();
        
        // Convert to a JSON object to print data
        Gson gson = new Gson();
        List<AirportCodes> messages = new ArrayList();
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonArray rootObj = root.getAsJsonArray(); //May be an array, may be an object.
        for (JsonElement jsonElement : rootObj) {
            JsonObject jObj = jsonElement.getAsJsonObject();
            String endString = jObj.get("codeIataAirport").getAsString() + ", " + jObj.get("nameAirport").getAsString();
            messages.add(new AirportCodes(endString));
        }
        return gson.toJson(messages);
    }
}
