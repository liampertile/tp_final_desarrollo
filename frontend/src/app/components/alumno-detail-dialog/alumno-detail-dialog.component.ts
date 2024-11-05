import { Component, Inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alumno-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './alumno-detail-dialog.component.html',
  styleUrls: ['./alumno-detail-dialog.component.css'],
})
export class AlumnoDetailDialogComponent implements OnInit {
  alumno!: Alumno;

  constructor(
    private alumnoService: AlumnoService,
    private dialogRef: MatDialogRef<AlumnoDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Alumno
  ) {
    if (data) {
      this.alumno = data; // Asigna el alumno directamente desde los datos inyectados
    }
  }

  ngOnInit(): void {
    // Si se abre sin datos, puedes obtener el alumno desde el servicio como alternativa
    if (!this.alumno && this.data.id) {
      this.alumnoService.obtenerAlumnoPorId(this.data.id).subscribe(alumno => {
        this.alumno = alumno;
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
