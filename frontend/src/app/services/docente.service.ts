import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model'; // Asegúrate de tener este modelo definido

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  private apiUrl = 'http://localhost:8080/docente'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los docentes
  obtenerTodosLosDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.apiUrl);
  }

  // Obtener un docente por ID
  obtenerDocentePorId(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo docente
  crearDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(this.apiUrl, docente);
  }

  // Actualizar un docente existente
  actualizarDocente(id: number, docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.apiUrl}/${id}`, docente);
  }

  // Eliminar un docente por ID
  eliminarDocente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
