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

import com.example.gestion_academica.entity.Docente;
import com.example.gestion_academica.service.DocenteService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/docente")
public class DocenteController {
	@Autowired
	DocenteService docenteService;
	
	@CrossOrigin //para poder realizar las peticiones desde otra aplicacion
	@GetMapping()
	public List<Docente> getAllDocentes(){
		return docenteService.obtenerTodosLosDocentes();
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Docente> getDocentebyId(@PathVariable Long id) {
	    Optional<Docente> docente = docenteService.obtenerDocentePorId(id);
	    return docente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@CrossOrigin
	@PostMapping
    public ResponseEntity<Docente> createDocente(@RequestBody Docente docente) {
        return docenteService.crearDocente(docente);
    }
	 
	@CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocente(@PathVariable Long id) {
		boolean eliminado = docenteService.eliminarDocente(id);  // Verifica si se eliminó

	    if (eliminado) {
	        return ResponseEntity.noContent().build();  // 204 No Content si se eliminó correctamente
	    } else {
	        return ResponseEntity.notFound().build();  // 404 Not Found si no se encontró el docente
	    }
    }
	
	@CrossOrigin
	@PutMapping("/{id}")
	public ResponseEntity<Docente> updateDocente(@PathVariable Long id, @RequestBody Docente updatedDocente) {
	    return docenteService.actualizarDocente(id, updatedDocente); // Llama al servicio y retorna la respuesta
	}

	
}
