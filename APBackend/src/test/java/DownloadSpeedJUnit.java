/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import JsonMessages.AirportCodes;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author PC
 */
public class DownloadSpeedJUnit {

    public DownloadSpeedJUnit() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }

    @Test
    public void getJsonTimeForDownloadAndDTO() throws MalformedURLException, IOException {
        //Get String to read
        String SURL = "https://aviation-edge.com/api/public/airportDatabase?key=";
        String key = "d66dff-0edac2-c9e092-beaa65-c41e3c";
        String finalString = SURL + key;

        // Start timer before intialize
        long startTime = System.currentTimeMillis();
        URL url = new URL(finalString);
        HttpURLConnection request = (HttpURLConnection) url.openConnection();
        request.connect();
        InputStreamReader ir = new InputStreamReader((InputStream) request.getContent());

        long afterGetContentTime = System.currentTimeMillis();

        Gson gson = new Gson(); // From gson to parse json vice versa
        JsonParser jp = new JsonParser(); //from gson to parse readers
        
        //Empty arraylist to initialize for later
        List<AirportCodes> messages = new ArrayList();
        
        JsonElement root = jp.parse(ir); //Convert the input stream to a json element
        JsonArray rootObj = root.getAsJsonArray(); //May be an array, may be an object. At this point it is a JsonArray
        
        //Make DTO to messages.
        for (JsonElement jsonElement : rootObj) {
            JsonObject jObj = jsonElement.getAsJsonObject();
            String endString = jObj.get("codeIataAirport").getAsString() + ", " + jObj.get("nameAirport").getAsString();
            messages.add(new AirportCodes(endString));
        }
        
        String res = gson.toJson(messages);
        long doneTime = System.currentTimeMillis();
        System.out.println("DownloadTime: " + (afterGetContentTime - startTime));
        System.out.println("JSONParseTime: " + (doneTime - afterGetContentTime));
        System.out.println("totalTIme: " + (doneTime - startTime));
        System.out.println(res);
    }
    
    @Test
    public void getJsonTimeForFileReader() throws FileNotFoundException {
        //Initialize start time
        long startTime = System.currentTimeMillis();
        
        //Get text file from resources
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("jsonFile.txt").getFile());
        FileReader fr = new FileReader(file);
        long afterGetContentTime = System.currentTimeMillis();
        
        // Convert to a JSON object to print data
        Gson gson = new Gson(); // from gson to parse vice versa
        Type listType = new TypeToken<List<AirportCodes>>() {
        }.getType();
        List<AirportCodes> res = gson.fromJson(fr, listType);
        
        long doneTime = System.currentTimeMillis();
        System.out.println("DownloadTime: " + (afterGetContentTime - startTime));
        System.out.println("JSONParseTime: " + (doneTime - afterGetContentTime));
        System.out.println("totalTIme: " + (doneTime - startTime));
        System.out.println(gson.toJson(res));
    }
}
