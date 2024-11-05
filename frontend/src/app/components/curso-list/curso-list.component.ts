import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';
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
import { DocenteService } from '../../services/docente.service'; // Importa el servicio de docentes
import { Docente } from '../../models/docente.model'; // Asegúrate de importar el modelo de Docente
import { Alumno } from '../../models/alumno.model'; // Asegúrate de importar el modelo de Alumno
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { CursoDetailDialogComponent } from '../curso-detail-dialog/curso-detail-dialog.component'; // Asegúrate de que la ruta sea correcta


@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [
    CommonModule,
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
    RouterLink,
    CursoDetailDialogComponent,
    
  ],
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
})
export class CursoListComponent implements OnInit {
  listaCursos: Curso[] = [];
  listaCursosFiltrados: Curso[] = [];  // Lista para los cursos filtrados
  displayedColumns: string[] = ['tema', 'fechaInicio', 'fechaFin', 'docente', 'acciones'];
  fechaFinFiltro: string = '';
  listaDocentes: any[] = [];
  listaAlumnos: Alumno[] = [];
  docenteFiltroId: number | null = null; // ID del docente seleccionado
  docentes: Docente[] = [];  // Lista de docentes
  
  constructor(private cursoService: CursoService,  private router: Router, private dialog: MatDialog,  private docenteService: DocenteService,) {}
  
  ngOnInit(): void {
    console.log('Componente CursoListComponent inicializado');
    this.obtenerCursos();
    this.obtenerDocentes();
  }

  onFechaFinChange(): void {
    console.log('Fecha de Fin Cambiada:', this.fechaFinFiltro);
  }

  obtenerCursos(): void {
    this.cursoService.obtenerTodosLosCursos().subscribe(cursos => {
      this.listaCursos = cursos;
    });
  }

  // Método para filtrar los cursos por fecha de fin
  filtrarCursos(): void {
    console.log('Se ha llamado a filtrarCursos');
    console.log('Valor de fechaFinFiltro:', this.fechaFinFiltro);  // Imprime el valor de fechaFinFiltro
  
    if (this.fechaFinFiltro) {
      // No es necesario convertir a string si ya está en el formato correcto
      const fechaFormateada = this.fechaFinFiltro; // O convertir si es necesario
      console.log('Fecha formateada:', fechaFormateada);
    
      this.cursoService.obtenerCursosPorFechaFin(fechaFormateada).subscribe(cursos => {
        this.listaCursosFiltrados = cursos; // Actualiza la lista de cursos filtrados
        console.log('Cursos filtrados:', this.listaCursosFiltrados); // Imprime los cursos filtrados
      }, error => {
        console.error('Error al obtener cursos filtrados:', error); // Imprime el error si hay uno
      });
    } else {
      this.listaCursosFiltrados = []; // Limpia la tabla si no hay filtro
      console.log('No hay fecha de fin proporcionada. Limpio la lista de cursos filtrados.');
    }
  }
  
  
  // Método auxiliar para convertir fecha
  convertirFechaAString(fecha: string): string {
    const fechaObj = new Date(fecha);
    return fechaObj.toISOString().split('T')[0];  // Obtiene solo la parte de la fecha en formato 'YYYY-MM-DD'
  }
  
  

  obtenerDocentes(): void {
    this.docenteService.obtenerTodosLosDocentes().subscribe(docentes => {
      this.docentes = docentes;
      console.log('Docentes:', this.docentes); // Para depuración
    });
  }

  filtrarAlumnosPorDocente(): void {
    if (this.docenteFiltroId) {
      this.cursoService.obtenerAlumnosDelCursoVigentePorDocente(this.docenteFiltroId).subscribe(alumnos => {
        this.listaAlumnos = alumnos; // Almacena los alumnos en la lista
      });
    } else {
      this.listaAlumnos = []; // Limpia la lista si no hay docente seleccionado
    }
  }


  nuevoCurso(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  editarCurso(id: number): void {
    this.router.navigate([`/cursos/editar/${id}`]);
  }
  

  eliminarCurso(id: number): void {
    if (confirm("¿Está seguro que desea eliminar este curso?")) {
      this.cursoService.eliminarCurso(id).subscribe(() => {
        this.obtenerCursos(); // Actualiza la lista después de eliminar
      });
    }
  }

  verCurso(curso: Curso): void {
    const dialogRef = this.dialog.open(CursoDetailDialogComponent, {
      width: '400px', // Ajusta el tamaño del diálogo según necesites
      data: curso, // Pasa el objeto curso al diálogo
    });
  
  }


  
  
}

