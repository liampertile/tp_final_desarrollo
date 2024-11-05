// src/app/services/alumno.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model'; // Importa el modelo de Alumno

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private baseUrl = 'http://localhost:8080/alumno'; // Cambia esto según la URL de tu backend

  constructor(private http: HttpClient) { }

  obtenerTodosLosAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.baseUrl);
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.baseUrl}/${id}`);
  }

  crearAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.baseUrl, alumno);
  }

  actualizarAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.baseUrl}/${id}`, alumno);
  }

  eliminarAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
