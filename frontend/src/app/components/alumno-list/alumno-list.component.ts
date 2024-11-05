import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoDetailDialogComponent } from '../alumno-detail-dialog/alumno-detail-dialog.component'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    AlumnoDetailDialogComponent,
  ],
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css'],
})
export class AlumnoListComponent implements OnInit {
  listaAlumnos: Alumno[] = [];
  displayedColumns: string[] = ['nombre', 'fechaNacimiento', 'acciones'];

  constructor(private alumnoService: AlumnoService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Componente AlumnoListComponent inicializado');
    this.obtenerAlumnos();
  }

  obtenerAlumnos(): void {
    this.alumnoService.obtenerTodosLosAlumnos().subscribe(alumnos => {
      this.listaAlumnos = alumnos;
    });
  }

  nuevoAlumno(): void {
    this.router.navigate(['/alumnos/nuevo']);
  }

  editarAlumno(id: number): void {
    this.router.navigate([`/alumnos/editar/${id}`]);
  }

  eliminarAlumno(id: number): void {
    if (confirm("¿Está seguro que desea eliminar este alumno?")) {
      this.alumnoService.eliminarAlumno(id).subscribe(() => {
        this.obtenerAlumnos(); // Actualiza la lista después de eliminar
      });
    }
  }

  verAlumno(alumno: Alumno): void {
    const dialogRef = this.dialog.open(AlumnoDetailDialogComponent, {
      width: '400px', // Ajusta el tamaño del diálogo según necesites
      data: alumno, // Pasa el objeto alumno al diálogo
    });
  }
}
