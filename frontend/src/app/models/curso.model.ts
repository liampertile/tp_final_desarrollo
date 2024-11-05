// src/app/models/curso.model.ts
export interface Curso {
    id: number;                      // ID del curso (Long en Java)
    tema: Tema;                     // Objeto Tema relacionado (definir en otro archivo)
    fechaInicio: Date;            // Fecha de inicio (formato YYYY-MM-DD)
    fechaFin: Date;               // Fecha de fin (formato YYYY-MM-DD)
    docente: Docente;               // Objeto Docente relacionado (definir en otro archivo)
    precio: number;                 // Precio del curso (Double en Java)
    alumnos?: Alumno[];             // Lista de alumnos (opcional, define Alumno en otro archivo)
  }
  
  // Definiciones de interfaces relacionadas
  export interface Tema {
    id: number;
    nombre: string;
    
  }
  
  export interface Docente {
    id: number;
    nombre: string;
    // Otros campos que necesites
  }
  
  export interface Alumno {
    id: number;
    nombre: string;
    // Otros campos que necesites
  }
  