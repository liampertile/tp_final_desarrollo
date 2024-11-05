import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../models/docente.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './docente-edit.component.html',
  styleUrls: ['./docente-edit.component.css']
})
export class DocenteEditComponent implements OnInit {
  docente!: Docente; // Asigna el docente a editar

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.docenteService.obtenerDocentePorId(id).subscribe(docente => {
      this.docente = docente;
    });
  }

  actualizarDocente(): void {
    this.docenteService.actualizarDocente(this.docente.id, this.docente).subscribe(() => {
      alert('Docente actualizado con éxito');
      this.router.navigate(['/docentes']); // Navega de vuelta a la lista de docentes
    });
  }
}
