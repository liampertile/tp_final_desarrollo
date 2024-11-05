package com.example.gestion_academica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gestion_academica.entity.Tema;
import com.example.gestion_academica.repository.TemaRepository;

@Service
public class TemaServiceImp implements TemaService{
	@Autowired 
	TemaRepository temaRepository;
	
	@Override
    public List<Tema> obtenerTodosLosTemas() {
        return temaRepository.findAll();
    }
	
	@Override
	public Optional<Tema> obtenerTemaPorId(Long id){
		return temaRepository.findById(id);  // JpaRepository ya retorna un Optional
	}
	
	@Override
	public ResponseEntity<Tema> crearTema(Tema tema) {
	    Tema savedTema = temaRepository.save(tema);  
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedTema);
	}
	
	@Override
	public boolean eliminarTema(Long id) {
	    if (!temaRepository.existsById(id)) {  // Verifica si el tema existe
	        return false;  // Retorna false si no existe
	    }

	    temaRepository.deleteById(id);  // Elimina el tema si existe
	    return true;  // Retorna true si se eliminó correctamente
	}

	@Override
	public ResponseEntity<Tema> actualizarTema(Long id, Tema temaActualizado) {
	    // Verifica si el tema existe
	    if (!temaRepository.existsById(id)) {
	        return ResponseEntity.notFound().build(); // Retorna 404 Not Found si no existe
	    }

	    // Asigna el ID al tema actualizado
	    temaActualizado.setId(id);

	    // Guarda el tema actualizado
	    Tema savedTema = temaRepository.save(temaActualizado);
	    
	    return ResponseEntity.ok(savedTema); // Retorna 200 OK con el tema actualizado
	}
}
