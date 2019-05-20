/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package main;

import util.*;
import domein.Docent;
import java.math.BigDecimal;
import javax.persistence.EntityManager;

/**
 *
 * @author Hp
 */
public class MAINOef1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Docent a = new Docent(123,"Jan","Baard",new BigDecimal(8000));
        Docent b = new Docent(456,"Piet","Baard",new BigDecimal(10000));
        Docent c = new Docent(789,"Joris","ZonderBaard",new BigDecimal(12000));
        
        EntityManager entityManager = JPAUtil.getEntityManagerFactory().createEntityManager();
        entityManager.getTransaction().begin();
        entityManager.persist(a);
        entityManager.persist(b);
        entityManager.persist(c);
        
        entityManager.getTransaction().commit();
        entityManager.close();
        
        JPAUtil.getEntityManagerFactory().close();
    }
    
}
