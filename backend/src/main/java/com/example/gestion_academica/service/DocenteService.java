package com.example.gestion_academica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;


import com.example.gestion_academica.entity.Docente;


public interface DocenteService {
	List<Docente> obtenerTodosLosDocentes();

	Optional<Docente> obtenerDocentePorId(Long id);

	ResponseEntity<Docente> crearDocente(Docente docente);

	boolean eliminarDocente(Long id);

	ResponseEntity<Docente> actualizarDocente(Long id, Docente updatedDocente);
}
