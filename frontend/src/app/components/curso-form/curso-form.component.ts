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
  selector: 'app-curso-form',
  standalone:true,
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
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent {
  curso: Curso = {
    id: 0,
    tema: { id: 0, nombre: '' },   // Inicializa según sea necesario
    fechaInicio: new Date(),        // Inicializa con la fecha actual
    fechaFin: new Date(),           // Inicializa con la fecha actual
    docente: { id: 0, nombre: '' }, // Inicializa según sea necesario
    precio: 0,
    alumnos: []                     // Inicializa como un arreglo vacío
  };

  temas: Tema[] = []; // Almacena la lista de temas
  docentes: Docente[] = []; // Almacena la lista de docentes
  alumnos: Alumno[] = []; // Lista de todos los alumnos disponibles

  constructor(
    private cursoService: CursoService,
    private temaService: TemaService, // Inyecta el TemaService
    private docenteService: DocenteService, // Inyecta el DocenteService
    private alumnoService: AlumnoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDocentes();
      this.cargarTemas();
      this.cargarAlumnos();
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
    this.alumnoService.obtenerTodosLosAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
  }
  
  cancelar() {
    this.router.navigate(['/cursos']);
  }

  guardarCurso() {
    // En este caso, ya no necesitas convertir las fechas, ya que son de tipo Date
    this.cursoService.crearCurso(this.curso).subscribe(() => {
      this.router.navigate(['/cursos']); // Navega a la lista de cursos después de crear
    });
  }
}
