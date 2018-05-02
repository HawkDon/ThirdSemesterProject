/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Entity;

/**
 *
 * @author PC
 */
public class Airports extends Message{
    private String airportId;
    private String nameAirport;
    private String codeIataAirport;
    private String codeIcaoAirport;
    private String nameCountry;
    private String codeIso2Country;
    private String codeIataCity;

    public Airports(String airportId, String nameAirport, String codeIataAirport, String codeIcaoAirport, String nameCountry, String codeIso2Country, String codeIataCity) {
        this.airportId = airportId;
        this.nameAirport = nameAirport;
        this.codeIataAirport = codeIataAirport;
        this.codeIcaoAirport = codeIcaoAirport;
        this.nameCountry = nameCountry;
        this.codeIso2Country = codeIso2Country;
        this.codeIataCity = codeIataCity;
    }
    
    
    
}
