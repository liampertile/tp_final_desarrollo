import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model'; // Importa el modelo Tema

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private apiUrl = 'http://localhost:8080/tema'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los temas
  obtenerTodosLosTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.apiUrl);
  }

  // Obtener un tema por ID
  obtenerTemaPorId(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo tema
  crearTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(this.apiUrl, tema);
  }

  // Actualizar un tema existente
  actualizarTema(id: number, tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.apiUrl}/${id}`, tema);
  }

  // Eliminar un tema por ID
  eliminarTema(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
