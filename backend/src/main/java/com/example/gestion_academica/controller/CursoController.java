package com.example.gestion_academica.controller;

//import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import com.example.gestion_academica.entity.Curso;
import com.example.gestion_academica.service.CursoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/curso")
public class CursoController {
	@Autowired
	CursoService cursoService;
	
	@CrossOrigin //para poder realizar las peticiones desde otra aplicacion
	@GetMapping()
	public List<Curso> getAllCursos(){
		return cursoService.obtenerTodosLosCursos();
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Curso> getCursobyId(@PathVariable Long id) {
	    Optional<Curso> curso = cursoService.obtenerCursoPorId(id);
	    return curso.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@CrossOrigin
	@PostMapping
    public ResponseEntity<Curso> createCurso(@RequestBody Curso curso) {
        return cursoService.crearCurso(curso);
    }
	 
	@CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
		boolean eliminado = cursoService.eliminarCurso(id);  // Verifica si se eliminó

	    if (eliminado) {
	        return ResponseEntity.noContent().build();  // 204 No Content si se eliminó correctamente
	    } else {
	        return ResponseEntity.notFound().build();  // 404 Not Found si no se encontró el curso
	    }
    }
	
	@CrossOrigin
	@PutMapping("/{id}")
	public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso updatedCurso) {
	    return cursoService.actualizarCurso(id, updatedCurso); // Llama al servicio y retorna la respuesta
	}
	
	@GetMapping("/finalizan/{fechaFin}")
    public ResponseEntity<List<Curso>> getCursosPorFechaFin(@PathVariable("fechaFin") @DateTimeFormat( pattern = "yyyy-MM-dd") LocalDate fechaFin) {
        // El controlador solo llama al servicio, la lógica de respuesta está en el servicio
        return cursoService.obtenerCursosPorFechaFin(fechaFin);
    }
	
	// Endpoint para obtener los alumnos del curso vigente de un docente
    @GetMapping("/docente/{docenteId}/alumnos-vigentes")
    public List<Alumno> obtenerAlumnosDelCursoVigentePorDocente(@PathVariable("docenteId") Long docenteId) {
        return cursoService.obtenerAlumnosDelCursoVigentePorDocente(docenteId);

        
        //if (alumnos.isEmpty()) {
        //    return ResponseEntity.noContent().build(); // Si no hay alumnos, retornamos No Content (204)
        //}

        //return ResponseEntity.ok(alumnos); // Si hay alumnos, los retornamos en un OK (200)
    }
}
