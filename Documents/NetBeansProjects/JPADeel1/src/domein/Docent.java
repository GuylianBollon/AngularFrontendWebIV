/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package domein;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Hp
 */
@Entity
@Table(name = "docenten")
public class Docent implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "PERSONEELSNR")
    private int docentNr;
    private String voornaam;
    private String familienaam;
    private BigDecimal wedde;

    protected Docent() {
    }
    
    

    public Docent(int docentNr, String voornaam, String familienaam, BigDecimal wedde) {
        this.docentNr = docentNr;
        this.voornaam = voornaam;
        this.familienaam = familienaam;
        this.wedde = wedde;
    }

    @Override
    public String toString() {
        return String.format("%d %s %s %s", docentNr, voornaam, familienaam, wedde);
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 83 * hash + this.docentNr;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Docent other = (Docent) obj;
        if (this.docentNr != other.docentNr) {
            return false;
        }
        return true;
    }

    public int getDocentNr() {
        return docentNr;
    }

    public void setDocentNr(int docentNr) {
        this.docentNr = docentNr;
    }

    public String getVoornaam() {
        return voornaam;
    }

    public void setVoornaam(String voornaam) {
        this.voornaam = voornaam;
    }

    public String getFamilienaam() {
        return familienaam;
    }

    public void setFamilienaam(String familienaam) {
        this.familienaam = familienaam;
    }

    public BigDecimal getWedde() {
        return wedde;
    }

    public void setWedde(BigDecimal wedde) {
        this.wedde = wedde;
    }
    
    public void opslag(BigDecimal bedrag){
        wedde=wedde.add(bedrag);
    }

}
