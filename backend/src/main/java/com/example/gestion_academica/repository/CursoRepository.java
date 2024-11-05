package com.example.gestion_academica.repository;

//import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.gestion_academica.entity.Alumno;
import com.example.gestion_academica.entity.Curso;
//import com.example.gestion_academica.entity.Docente;

public interface CursoRepository extends JpaRepository<Curso, Long>{
	List<Curso> findByFechaFin(LocalDate fechaFin);
	
	 // Método para obtener los cursos vigentes de un profesor
	//List<Curso> findByDocenteAndFechaInicioBeforeAndFechaFinAfter(Docente docente, LocalDate fechaInicio, LocalDate fechaFin);
	// Método para obtener los cursos vigentes de un profesor utilizando el ID del docente
    
	// Selecciono los alumnos presentes en los alumnos disponibles de los cursos
    // cuyo profesor coincida con el que representa el ID pasado por parámetro y la fecha del curso sea actual.
    @Query("SELECT a FROM Curso c JOIN c.alumnos a WHERE c.docente.id = :docenteId AND :fechaActual BETWEEN c.fechaInicio AND c.fechaFin")
    List<Alumno> findAlumnosByCursosVigentesByDocente(@Param("docenteId") Long docenteId, @Param("fechaActual") LocalDate fechaActual);
}
