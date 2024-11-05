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

import com.example.gestion_academica.entity.Tema;
import com.example.gestion_academica.service.TemaService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tema")
public class TemaController {
	@Autowired
	TemaService temaService;
	
	@CrossOrigin //para poder realizar las peticiones desde otra aplicacion
	@GetMapping()
	public List<Tema> getAllTemas(){
		return temaService.obtenerTodosLosTemas();
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Tema> getTemabyId(@PathVariable Long id) {
	    Optional<Tema> tema = temaService.obtenerTemaPorId(id);
	    return tema.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@CrossOrigin
	@PostMapping
    public ResponseEntity<Tema> createTema(@RequestBody Tema tema) {
        return temaService.crearTema(tema);
    }
	 
	@CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTema(@PathVariable Long id) {
		boolean eliminado = temaService.eliminarTema(id);  // Verifica si se eliminó

	    if (eliminado) {
	        return ResponseEntity.noContent().build();  // 204 No Content si se eliminó correctamente
	    } else {
	        return ResponseEntity.notFound().build();  // 404 Not Found si no se encontró el tema
	    }
    }
	
	@CrossOrigin
	@PutMapping("/{id}")
	public ResponseEntity<Tema> updateTema(@PathVariable Long id, @RequestBody Tema updatedTema) {
	    return temaService.actualizarTema(id, updatedTema); // Llama al servicio y retorna la respuesta
	}

	
}
