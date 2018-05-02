/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogicFacade;

import Entity.Airplanes;
import Entity.Airports;
import Entity.Message;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Oliver
 */
public class RestCalls {

    private static Gson gson = new Gson();

    public static String getJsonArrayWithID(String sURL, String qParameter) throws MalformedURLException, IOException {

        String apiKey = "d66dff-0edac2-c9e092-beaa65-c41e3c";

        String finalsURL = sURL + apiKey + qParameter;

        URL url = new URL(finalsURL);

        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonArray rootobj = root.getAsJsonArray(); //May be an array, may be an object. //just grab the zipcode
        return rootobj.toString();
    }

    public static String getJsonArray(String sURL) throws MalformedURLException, IOException {

        String apiKey = "d66dff-0edac2-c9e092-beaa65-c41e3c";

        String finalsURL = sURL + apiKey;

        URL url = new URL(finalsURL);

        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonArray rootobj = root.getAsJsonArray(); //May be an array, may be an object. 
        return rootobj.toString();
    }

    public static String getJsonObjectWithID(String sURL, String qParameter) throws MalformedURLException, IOException {
        String apiKey = "d66dff-0edac2-c9e092-beaa65-c41e3c";

        String finalsURL = sURL + apiKey + qParameter;

        URL url = new URL(finalsURL);

        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        // Convert to a JSON object to print data
        JsonParser jp = new JsonParser(); //from gson
        JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
        JsonObject rootobj = root.getAsJsonObject(); //May be an array, may be an object. 
        return rootobj.toString();
    }

    public static String getJsonForAirplanes(String sURL) throws MalformedURLException, IOException {

        String apiKey = "d66dff-0edac2-c9e092-beaa65-c41e3c";

        String finalsURL = sURL + apiKey;

        URL url = new URL(finalsURL);

        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        List<Message<Airplanes>> messages = new ArrayList();
        JsonReader reader = new JsonReader(new InputStreamReader((InputStream) request.getContent()));
        reader.beginArray();
        while (reader.hasNext()) {
            Message message = gson.fromJson(reader, Airplanes.class);
            messages.add(message);
        }
        reader.endArray();
        reader.close();
        return gson.toJson(messages);
    }

    public static String getJsonForAirplanesWithID(String sURL, String qParameter) throws MalformedURLException, IOException {

        String apiKey = "d66dff-0edac2-c9e092-beaa65-c41e3c";

        String finalsURL = sURL + apiKey + qParameter;

        URL url = new URL(finalsURL);

        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        List<Message<Airplanes>> messages = new ArrayList();
        JsonReader reader = new JsonReader(new InputStreamReader((InputStream) request.getContent()));
        reader.beginArray();
        while (reader.hasNext()) {
            Message message = gson.fromJson(reader, Airplanes.class);
            messages.add(message);
        }
        reader.endArray();
        reader.close();
        return gson.toJson(messages);
    }
    public static String getJsonForAirports(String sURL) throws MalformedURLException, IOException {

        String apiKey = "d66dff-0edac2-c9e092-beaa65-c41e3c";

        String finalsURL = sURL + apiKey;

        URL url = new URL(finalsURL);

        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        List<Message<Airports>> messages = new ArrayList();
        JsonReader reader = new JsonReader(new InputStreamReader((InputStream) request.getContent()));
        reader.beginArray();
        while (reader.hasNext()) {
            Message message = gson.fromJson(reader, Airports.class);
            messages.add(message);
        }
        reader.endArray();
        reader.close();
        return gson.toJson(messages);
    }
    public static String getJsonForAirportsWithID(String sURL, String qParameter) throws MalformedURLException, IOException {

        String apiKey = "d66dff-0edac2-c9e092-beaa65-c41e3c";

        String finalsURL = sURL + apiKey + qParameter;

        URL url = new URL(finalsURL);

        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();

        List<Message<Airports>> messages = new ArrayList();
        JsonReader reader = new JsonReader(new InputStreamReader((InputStream) request.getContent()));
        reader.beginArray();
        while (reader.hasNext()) {
            Message message = gson.fromJson(reader, Airports.class);
            messages.add(message);
        }
        reader.endArray();
        reader.close();
        return gson.toJson(messages);
    }
}
