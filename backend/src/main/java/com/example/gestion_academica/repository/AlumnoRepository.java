package com.example.gestion_academica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestion_academica.entity.Alumno;


public interface AlumnoRepository extends JpaRepository<Alumno, Long>{

}
