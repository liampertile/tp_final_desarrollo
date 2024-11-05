package com.example.gestion_academica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gestion_academica.entity.Alumno;
import com.example.gestion_academica.repository.AlumnoRepository;

@Service
public class AlumnoServiceImp implements AlumnoService{
	@Autowired 
	AlumnoRepository alumnoRepository;
	
	@Override
    public List<Alumno> obtenerTodosLosAlumnos() {
        return alumnoRepository.findAll();
    }
	
	@Override
	public Optional<Alumno> obtenerAlumnoPorId(Long id){
		return alumnoRepository.findById(id);  // JpaRepository ya retorna un Optional
	}
	
	@Override
	public ResponseEntity<Alumno> crearAlumno(Alumno alumno) {
	    Alumno savedAlumno = alumnoRepository.save(alumno);  
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedAlumno);
	}
	
	@Override
	public boolean eliminarAlumno(Long id) {
	    if (!alumnoRepository.existsById(id)) {  // Verifica si el alumno existe
	        return false;  // Retorna false si no existe
	    }

	    alumnoRepository.deleteById(id);  // Elimina el alumno si existe
	    return true;  // Retorna true si se eliminó correctamente
	}

	@Override
	public ResponseEntity<Alumno> actualizarAlumno(Long id, Alumno alumnoActualizado) {
	    // Verifica si el alumno existe
	    if (!alumnoRepository.existsById(id)) {
	        return ResponseEntity.notFound().build(); // Retorna 404 Not Found si no existe
	    }

	    // Asigna el ID al alumno actualizado
	    alumnoActualizado.setId(id);

	    // Guarda el alumno actualizado
	    Alumno savedAlumno = alumnoRepository.save(alumnoActualizado);
	    
	    return ResponseEntity.ok(savedAlumno); // Retorna 200 OK con el alumno actualizado
	}
}
