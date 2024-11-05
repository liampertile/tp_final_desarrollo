package com.example.gestion_academica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.example.gestion_academica.entity.Tema;


public interface TemaService {

	List<Tema> obtenerTodosLosTemas();

	Optional<Tema> obtenerTemaPorId(Long id);

	ResponseEntity<Tema> crearTema(Tema tema);

	boolean eliminarTema(Long id);

	ResponseEntity<Tema> actualizarTema(Long id, Tema updatedTema);

	

	

}
