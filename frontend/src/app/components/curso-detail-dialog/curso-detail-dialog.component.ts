import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-curso-detail',
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
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './curso-detail-dialog.component.html',
  styleUrls: ['./curso-detail-dialog.component.css'],
})
export class CursoDetailDialogComponent implements OnInit {
  curso!: Curso; // El signo de exclamación indica que este campo será inicializado más tarde

  constructor(
    private cursoService: CursoService,
    private dialogRef: MatDialogRef<CursoDetailDialogComponent>, // Inyecta MatDialogRef para cerrar el diálogo
    @Inject(MAT_DIALOG_DATA) private data: Curso, // Inyecta los datos del diálogo
    private route: ActivatedRoute // Inyecta ActivatedRoute para obtener el ID de la URL
  ) {
    // Si los datos se pasan al abrir el diálogo, se asignan a curso
    if (data) {
      this.curso = data; // Se asigna el curso desde los datos del diálogo
    }
  }

  ngOnInit(): void {
    // Solo obtiene el curso si no se pasaron datos
    if (!this.curso) {
      const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID del curso de la URL
      this.cursoService.obtenerCursoPorId(id).subscribe(curso => {
        this.curso = curso; // Asigna el curso obtenido a la propiedad
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }
}
