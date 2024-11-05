import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/docente.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DocenteDetailDialogComponent } from '../docente-detail-dialog/docente-detail-dialog.component'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    DocenteDetailDialogComponent,
  ],
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css'],
})
export class DocenteListComponent implements OnInit {
  listaDocentes: Docente[] = [];
  displayedColumns: string[] = ['nombre', 'legajo', 'acciones'];

  constructor(private docenteService: DocenteService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Componente DocenteListComponent inicializado');
    this.obtenerDocentes();
  }

  obtenerDocentes(): void {
    this.docenteService.obtenerTodosLosDocentes().subscribe(docentes => {
      this.listaDocentes = docentes;
    });
  }

  nuevoDocente(): void {
    this.router.navigate(['/docentes/nuevo']);
  }

  editarDocente(id: number): void {
    this.router.navigate([`/docentes/editar/${id}`]);
  }

  eliminarDocente(id: number): void {
    if (confirm("¿Está seguro que desea eliminar este docente?")) {
      this.docenteService.eliminarDocente(id).subscribe(() => {
        this.obtenerDocentes(); // Actualiza la lista después de eliminar
      });
    }
  }

  verDocente(docente: Docente): void {
    const dialogRef = this.dialog.open(DocenteDetailDialogComponent, {
      width: '400px', // Ajusta el tamaño del diálogo según necesites
      data: docente, // Pasa el objeto docente al diálogo
    });
  }
}
