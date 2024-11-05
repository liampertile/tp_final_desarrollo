package com.example.gestion_academica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gestion_academica.entity.Docente;

import com.example.gestion_academica.repository.DocenteRepository;


@Service
public class DocenteServiceImp implements DocenteService{
	@Autowired 
	DocenteRepository docenteRepository;
	
	@Override
    public List<Docente> obtenerTodosLosDocentes() {
        return docenteRepository.findAll();
    }
	
	@Override
	public Optional<Docente> obtenerDocentePorId(Long id){
		return docenteRepository.findById(id);  // JpaRepository ya retorna un Optional
	}
	
	@Override
	public ResponseEntity<Docente> crearDocente(Docente docente) {
	    Docente savedDocente = docenteRepository.save(docente);  
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedDocente);
	}
	
	@Override
	public boolean eliminarDocente(Long id) {
	    if (!docenteRepository.existsById(id)) {  // Verifica si el docente existe
	        return false;  // Retorna false si no existe
	    }

	    docenteRepository.deleteById(id);  // Elimina el docente si existe
	    return true;  // Retorna true si se eliminó correctamente
	}

	@Override
	public ResponseEntity<Docente> actualizarDocente(Long id, Docente docenteActualizado) {
	    // Verifica si el docente existe
	    if (!docenteRepository.existsById(id)) {
	        return ResponseEntity.notFound().build(); // Retorna 404 Not Found si no existe
	    }

	    // Asigna el ID al docente actualizado
	    docenteActualizado.setId(id);

	    // Guarda el docente actualizado
	    Docente savedDocente = docenteRepository.save(docenteActualizado);
	    
	    return ResponseEntity.ok(savedDocente); // Retorna 200 OK con el docente actualizado
	}
}
