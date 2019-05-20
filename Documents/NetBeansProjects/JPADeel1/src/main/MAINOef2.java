/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package main;

import domein.Docent;
import java.math.BigDecimal;
import javax.persistence.EntityManager;
import util.JPAUtil;

/**
 *
 * @author Hp
 */
public class MAINOef2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        EntityManager entityManager = JPAUtil.getEntityManagerFactory().createEntityManager();
        entityManager.getTransaction().begin();
        
        Docent docent = entityManager.find(Docent.class, 2L);
        if(docent!=null){
            docent.opslag(new BigDecimal(200));
        }
        else{
            System.out.println("Docent 2 niet gevonden");
        }
        
        entityManager.getTransaction().commit();
        
        entityManager.close();
        JPAUtil.getEntityManagerFactory().close();
    }
    
}
