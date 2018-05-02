/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Entity;

/**
 *
 * @author Oliver
 */
public class Airplanes extends Message{
    private int airplaneId;
    private String numberRegistration;
    private String productionLine;
    private String hexIcaoAirplane;

    public Airplanes(int airplaneId, String numberRegistration, String productionLine, String hexIcaoAirplane) {
        super();
        this.airplaneId = airplaneId;
        this.numberRegistration = numberRegistration;
        this.productionLine = productionLine;
        this.hexIcaoAirplane = hexIcaoAirplane;
    }
    
}
