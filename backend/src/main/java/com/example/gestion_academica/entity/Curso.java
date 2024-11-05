package com.example.gestion_academica.entity;

//import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name="curso")
public class Curso {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne // Muchos cursos para un tema.
	@JoinColumn(name="tema_id", nullable=false)
	private Tema tema;
	
	@Column(name="fecha_inicio", nullable=false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") // Indicas el formato que esperas.
	@Temporal(TemporalType.DATE)  // Solo guarda el día, mes y año
	private  LocalDate fechaInicio;
	
	@Column(name="fecha_fin", nullable=false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") // Indicas el formato que esperas.
	@Temporal(TemporalType.DATE)  // Solo guarda el día, mes y año
	private LocalDate fechaFin;
	
	@ManyToOne // Muchos cursos para un docente.
	@JoinColumn(name="docente_id",nullable=false)
	private Docente docente;
	
	@Column(name="precio",nullable=false)
	private Double precio;
	
	
	
	//@ManyToMany
	//private List<Alumno> alumnos;
    //Al no usar @JoinTable, JPA generará automáticamente una tabla intermedia con un nombre basado en las dos entidades involucradas (por ejemplo, curso_alumno).
    //También creará columnas con nombres derivados de las claves primarias de ambas entidades (por ejemplo, curso_id y alumno_id).
	//Esta forma es más simple, pero si necesitas personalizar la tabla intermedia o las columnas, entonces tendrás que usar la versión más detallada que te mostré antes.

	@ManyToMany
	@JoinTable(
	    name = "curso_alumno", // Nombre de la tabla intermedia
	    joinColumns = @JoinColumn(name = "curso_id"), // Columna que une con la tabla curso
	    inverseJoinColumns = @JoinColumn(name = "alumno_id") // Columna que une con la tabla alumno
	)
	private List<Alumno> alumnos;
	
	
	public Curso() {}
	
	public Curso(LocalDate fechaInicio, LocalDate fechaFin, Double precio, Docente docente, Tema tema, List<Alumno> alumnos) {
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.precio = precio;
		this.docente = docente;
		this.tema = tema;
		this.alumnos = alumnos;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Tema getTema() {
		return tema;
	}

	public void setTema(Tema tema) {
		this.tema = tema;
	}

	public LocalDate getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(LocalDate fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public LocalDate getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(LocalDate fechaFin) {
		this.fechaFin = fechaFin;
	}

	public Docente getDocente() {
		return docente;
	}

	public void setDocente(Docente docente) {
		this.docente = docente;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public List<Alumno> getAlumnos() {
		return alumnos;
	}

	public void setAlumnos(List<Alumno> alumnos) {
		this.alumnos = alumnos;
	}

	
	
	

	
	
	
	//@ManyToMany
	//@JoinTable(
	//    name = "curso_alumno", // Nombre de la tabla intermedia
	//    joinColumns = @JoinColumn(name = "curso_id"), // Columna que une con la tabla curso
	//    inverseJoinColumns = @JoinColumn(name = "alumno_id") // Columna que une con la tabla alumno
	//)
	//private List<Alumno> alumnos;
	
	
}
