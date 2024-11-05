import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso,Alumno } from '../../models/curso.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Docente } from '../../models/docente.model';
import { Tema } from '../../models/tema.model';
import { DocenteService } from '../../services/docente.service'; // Asegúrate de que está importado
import { TemaService } from '../../services/tema.service'; // Asegúrate de que está importado
import { AlumnoService } from '../../services/alumno.service'; // Asegúrate de importar el servicio de alumnos
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-curso-edit',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule ,
    RouterModule,
    MatSelectModule,
    MatListModule,
    ],
  templateUrl: './curso-edit.component.html',
  styleUrl: './curso-edit.component.css'
})
export class CursoEditComponent implements OnInit {
  curso!: Curso; // El signo de exclamación indica que este campo será inicializado más tarde
  docentes: Docente[] = []; // Lista de docentes
  temas: Tema[] = []; // Lista de temas
  alumnosCurso: Alumno[] = [];
  todosLosAlumnos: Alumno[] = [];
  alumnosSeleccionados: Alumno[] = [];
  alumnosNoInscritos: Alumno[] = []; // Lista filtrada de alumnos que no pertenecen al curso
  alumnosParaEliminar: Alumno[] = []; // Alumnos seleccionados para eliminar

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private cursoService: CursoService,
    private docenteService: DocenteService, // Agregar docenteService
    private temaService: TemaService, // Agregar temaService
    private alumnoService: AlumnoService // Inyecta el servicio de alumnos
  ) {}

  ngOnInit(): void {
    // Obtiene el ID del curso de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cursoService.obtenerCursoPorId(id).subscribe(curso => {
      this.curso = curso;
      this.alumnosCurso = curso.alumnos || []; // Asegurarse de que alumnosCurso esté inicializado
      this.cargarDocentes();
      this.cargarTemas();
      this.cargarAlumnos(); // Cargar todos los alumnos después de obtener los del curso
    });
    
  }

  cargarDocentes(): void {
    this.docenteService.obtenerTodosLosDocentes().subscribe(docentes => {
      this.docentes = docentes;
    });
  }

  cargarTemas(): void {
    this.temaService.obtenerTodosLosTemas().subscribe(temas => {
      this.temas = temas;
    });
  }

  cargarAlumnos(): void {
    this.alumnoService.obtenerTodosLosAlumnos().subscribe(alumnos => {
      this.todosLosAlumnos = alumnos;
      this.filtrarAlumnosNoInscritos(); // Filtrar los alumnos que no están en el curso
    });
  }

  filtrarAlumnosNoInscritos(): void {
    this.alumnosNoInscritos = this.todosLosAlumnos.filter(alumno => 
      !this.alumnosCurso.some(alumnoCurso => alumnoCurso.id === alumno.id)
    );
    console.log("Alumnos no inscritos:", this.alumnosNoInscritos); // Debug para verificar
  }

  agregarAlumno(alumno: Alumno): void {
    if (!this.alumnosCurso.includes(alumno)) {
      this.alumnosCurso.push(alumno);
    }
  }

  eliminarAlumnoDelCurso(alumno: Alumno): void {
    this.alumnosCurso = this.alumnosCurso.filter(a => a.id !== alumno.id);
  }

  actualizarCurso(): void {
    // Agregar nuevos alumnos
    this.alumnosSeleccionados.forEach(alumno => this.agregarAlumno(alumno));

    // Eliminar los alumnos seleccionados
    this.alumnosCurso = this.alumnosCurso.filter(alumno => 
      !this.alumnosParaEliminar.some(alumnoEliminar => alumnoEliminar.id === alumno.id)
    );

    // Asignar los alumnos al curso
    this.curso.alumnos = this.alumnosCurso;

    this.cursoService.actualizarCurso(this.curso.id, this.curso).subscribe(() => {
      alert('Curso actualizado con éxito');
      this.router.navigate(['/cursos']); // Navega de vuelta a la lista de cursos
    });
  }
}
