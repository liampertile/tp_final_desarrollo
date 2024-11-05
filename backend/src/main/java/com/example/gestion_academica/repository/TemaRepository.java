package com.example.gestion_academica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestion_academica.entity.Tema;

public interface TemaRepository extends JpaRepository<Tema, Long>{//long tipo de dato de la primary key de tema

}
//utilizando el TemaRepository vamos a poder acceder a todo el conjunto de funcionalidades del JpaRepository incluyen todas las funciones del CRUD