package com.example.gestion_academica.service;

//import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.gestion_academica.entity.Alumno;
import com.example.gestion_academica.entity.Curso;
//import com.example.gestion_academica.entity.Docente;
import com.example.gestion_academica.repository.CursoRepository;


@Service
public class CursoServiceImp implements CursoService {
	@Autowired 
	CursoRepository cursoRepository;
	
	
	
	@Override
    public List<Curso> obtenerTodosLosCursos() {
        return cursoRepository.findAll();
    }
	
	@Override
	public Optional<Curso> obtenerCursoPorId(Long id){
		return cursoRepository.findById(id);  // JpaRepository ya retorna un Optional
	}
	
	@Override
	public ResponseEntity<Curso> crearCurso(Curso curso) {
	    Curso savedCurso = cursoRepository.save(curso);  
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedCurso);
	}
	
	@Override
	public boolean eliminarCurso(Long id) {
	    if (!cursoRepository.existsById(id)) {  // Verifica si el curso existe
	        return false;  // Retorna false si no existe
	    }

	    cursoRepository.deleteById(id);  // Elimina el curso si existe
	    return true;  // Retorna true si se eliminó correctamente
	}

	@Override
	public ResponseEntity<Curso> actualizarCurso(Long id, Curso cursoActualizado) {
	    // Verifica si el curso existe
	    if (!cursoRepository.existsById(id)) {
	        return ResponseEntity.notFound().build(); // Retorna 404 Not Found si no existe
	    }

	    // Asigna el ID al curso actualizado
	    cursoActualizado.setId(id);

	    // Guarda el curso actualizado
	    Curso savedCurso = cursoRepository.save(cursoActualizado);
	    
	    return ResponseEntity.ok(savedCurso); // Retorna 200 OK con el curso actualizado
	}
	
	@Override
    public ResponseEntity<List<Curso>> obtenerCursosPorFechaFin(LocalDate fechaFin) {
        // Buscar los cursos por la fecha de finalización
        List<Curso> cursos = cursoRepository.findByFechaFin(fechaFin);

        // Verificamos si la lista está vacía o no
        if (cursos.isEmpty()) {
            // Si no se encontraron cursos, devolvemos un 204 No Content
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        // Si se encontraron cursos, devolvemos la lista con un 200 OK
        return new ResponseEntity<>(cursos, HttpStatus.OK);
    }
	
	@Override
	public List<Alumno> obtenerAlumnosDelCursoVigentePorDocente(Long docenteId) {
		LocalDate fechaActual = LocalDate.now();
		return cursoRepository.findAlumnosByCursosVigentesByDocente(docenteId, fechaActual);
	    // Buscar el docente por su ID
	    //Docente docente = docenteRepository.findById(docenteId)
	      //      .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

	    // Obtener la fecha actual
	    //LocalDate fechaActual = LocalDate.now();
	    //Date LocalDate = Date.valueOf(fechaActual); // Conversión a java.sql.Date

	    // Buscar los cursos vigentes de ese docente
	    //List<Curso> cursosVigentes = cursoRepository.findByDocenteAndFechaInicioBeforeAndFechaFinAfter(docente, LocalDate, LocalDate);

	    // Si no hay cursos vigentes, retornamos una lista vacía
	    //if (cursosVigentes.isEmpty()) {
	    //    return List.of();
	    //}

	    // Obtener los alumnos del primer curso vigente (puedes adaptar esto si hay más de un curso vigente)
	    //Curso cursoVigente = cursosVigentes.get(0);
	    //return cursoVigente.getAlumnos(); // Retornar la lista de alumnos
	}
}
