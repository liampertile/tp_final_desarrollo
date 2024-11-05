import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model'; // Asegúrate de tener un modelo de Curso
import { Alumno } from '../models/alumno.model'; // Importa el modelo de Alumno

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private baseUrl = 'http://localhost:8080/curso'; // Ajusta según tu configuración

  constructor(private http: HttpClient) { }

  obtenerTodosLosCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.baseUrl);
  }

  obtenerCursoPorId(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseUrl}/${id}`);
  }

  crearCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.baseUrl, curso);
  }

  actualizarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseUrl}/${id}`, curso);
  }

  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  obtenerCursosPorFechaFin(fechaFin: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/finalizan/${fechaFin}`);
  }

  obtenerAlumnosDelCursoVigentePorDocente(docenteId: number): Observable<Alumno[]> {
     return this.http.get<Alumno[]>(`${this.baseUrl}/docente/${docenteId}/alumnos-vigentes`);
  }
}

