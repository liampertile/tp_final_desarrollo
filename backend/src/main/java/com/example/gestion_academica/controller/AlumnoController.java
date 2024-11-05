package com.example.gestion_academica.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestion_academica.entity.Alumno;
import com.example.gestion_academica.service.AlumnoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/alumno")
public class AlumnoController {
	@Autowired
	AlumnoService alumnoService;
	
	@CrossOrigin //para poder realizar las peticiones desde otra aplicacion
	@GetMapping()
	public List<Alumno> getAllAlumnos(){
		return alumnoService.obtenerTodosLosAlumnos();
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Alumno> getAlumnobyId(@PathVariable Long id) {
	    Optional<Alumno> alumno = alumnoService.obtenerAlumnoPorId(id);
	    return alumno.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@CrossOrigin
	@PostMapping
    public ResponseEntity<Alumno> createAlumno(@RequestBody Alumno alumno) {
        return alumnoService.crearAlumno(alumno);
    }
	 
	@CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumno(@PathVariable Long id) {
		boolean eliminado = alumnoService.eliminarAlumno(id);  // Verifica si se eliminó

	    if (eliminado) {
	        return ResponseEntity.noContent().build();  // 204 No Content si se eliminó correctamente
	    } else {
	        return ResponseEntity.notFound().build();  // 404 Not Found si no se encontró el alumno
	    }
    }
	
	@CrossOrigin
	@PutMapping("/{id}")
	public ResponseEntity<Alumno> updateAlumno(@PathVariable Long id, @RequestBody Alumno updatedAlumno) {
	    return alumnoService.actualizarAlumno(id, updatedAlumno); // Llama al servicio y retorna la respuesta
	}

}
