import { Component, Inject, OnInit } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../models/tema.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tema-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tema-detail-dialog.component.html',
  styleUrls: ['./tema-detail-dialog.component.css'],
})
export class TemaDetailDialogComponent implements OnInit {
  tema!: Tema;

  constructor(
    private temaService: TemaService,
    private dialogRef: MatDialogRef<TemaDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Tema
  ) {
    if (data) {
      this.tema = data; // Asigna el tema directamente desde los datos inyectados
    }
  }

  ngOnInit(): void {
    // Si se abre sin datos, puedes obtener el tema desde el servicio como alternativa
    if (!this.tema && this.data.id) {
      this.temaService.obtenerTemaPorId(this.data.id).subscribe(tema => {
        this.tema = tema;
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
