import { Component } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent {
  alumno: Alumno = {
    id: 0,
    nombre: '',
    fechaNacimiento: ''
  };

  constructor(
    private alumnoService: AlumnoService,
    private router: Router
  ) {}

  guardarAlumno(): void {
    this.alumnoService.crearAlumno(this.alumno).subscribe(() => {
      this.router.navigate(['/alumnos']); // Navega a la lista de alumnos después de guardar
    });
  }
}
