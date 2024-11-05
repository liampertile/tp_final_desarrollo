import { Component, Inject, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../models/docente.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-docente-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './docente-detail-dialog.component.html',
  styleUrls: ['./docente-detail-dialog.component.css'],
})
export class DocenteDetailDialogComponent implements OnInit {
  docente!: Docente;

  constructor(
    private docenteService: DocenteService,
    private dialogRef: MatDialogRef<DocenteDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Docente
  ) {
    if (data) {
      this.docente = data; // Asigna el docente directamente desde los datos inyectados
    }
  }

  ngOnInit(): void {
    // Si se abre sin datos, puedes obtener el docente desde el servicio como alternativa
    if (!this.docente && this.data.id) {
      this.docenteService.obtenerDocentePorId(this.data.id).subscribe(docente => {
        this.docente = docente;
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
