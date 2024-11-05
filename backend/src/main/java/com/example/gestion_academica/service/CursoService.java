package com.example.gestion_academica.service;

//import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;


import com.example.gestion_academica.entity.Alumno;
import com.example.gestion_academica.entity.Curso;



public interface CursoService {
	List<Curso> obtenerTodosLosCursos();

	Optional<Curso> obtenerCursoPorId(Long id);

	ResponseEntity<Curso> crearCurso(Curso curso);

	boolean eliminarCurso(Long id);

	ResponseEntity<Curso> actualizarCurso(Long id, Curso updatedCurso);
	
	ResponseEntity<List<Curso>> obtenerCursosPorFechaFin(LocalDate fechaFin);
	
	// Método para obtener los alumnos del curso vigente de un profesor
    List<Alumno> obtenerAlumnosDelCursoVigentePorDocente(Long docente);
}
