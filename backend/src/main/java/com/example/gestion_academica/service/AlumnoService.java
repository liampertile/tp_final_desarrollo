package com.example.gestion_academica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;


import com.example.gestion_academica.entity.Alumno;


public interface AlumnoService {
	List<Alumno> obtenerTodosLosAlumnos();

	Optional<Alumno> obtenerAlumnoPorId(Long id);

	ResponseEntity<Alumno> crearAlumno(Alumno alumno);

	boolean eliminarAlumno(Long id);

	ResponseEntity<Alumno> actualizarAlumno(Long id, Alumno updatedAlumno);

}
