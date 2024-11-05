import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from '../../models/tema.model';
import { TemaService } from '../../services/tema.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TemaDetailDialogComponent } from '../tema-detail-dialog/tema-detail-dialog.component'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-tema-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    TemaDetailDialogComponent,
  ],
  templateUrl: './tema-list.component.html',
  styleUrls: ['./tema-list.component.css'],
})
export class TemaListComponent implements OnInit {
  listaTemas: Tema[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];

  constructor(private temaService: TemaService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Componente TemaListComponent inicializado');
    this.obtenerTemas();
  }

  obtenerTemas(): void {
    this.temaService.obtenerTodosLosTemas().subscribe(temas => {
      this.listaTemas = temas;
    });
  }

  nuevoTema(): void {
    this.router.navigate(['/temas/nuevo']);
  }

  editarTema(id: number): void {
    this.router.navigate([`/temas/editar/${id}`]);
  }

  eliminarTema(id: number): void {
    if (confirm("¿Está seguro que desea eliminar este tema?")) {
      this.temaService.eliminarTema(id).subscribe(() => {
        this.obtenerTemas(); // Actualiza la lista después de eliminar
      });
    }
  }

  verTema(tema: Tema): void {
    const dialogRef = this.dialog.open(TemaDetailDialogComponent, {
      width: '400px', // Ajusta el tamaño del diálogo según necesites
      data: tema, // Pasa el objeto tema al diálogo
    });
  }
}
