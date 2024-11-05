import { Component } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../models/tema.model';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tema-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './tema-form.component.html',
  styleUrls: ['./tema-form.component.css']
})
export class TemaFormComponent {
  tema: Tema = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  constructor(
    private temaService: TemaService,
    private router: Router
  ) {}

  guardarTema(): void {
    this.temaService.crearTema(this.tema).subscribe(() => {
      this.router.navigate(['/temas']); // Navega a la lista de temas después de guardar
    });
  }
}
