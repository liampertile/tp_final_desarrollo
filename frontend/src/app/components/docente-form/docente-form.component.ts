import { Component } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../models/docente.model';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-docente-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.css']
})
export class DocenteFormComponent {
  docente: Docente = {
    id: 0,
    nombre: '',
    legajo: 0 // Asegúrate de que el tipo de legajo sea correcto según tu modelo
  };

  constructor(
    private docenteService: DocenteService,
    private router: Router
  ) {}

  guardarDocente(): void {
    this.docenteService.crearDocente(this.docente).subscribe(() => {
      this.router.navigate(['/docentes']); // Navega a la lista de docentes después de guardar
    });
  }
}
