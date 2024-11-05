import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumno-edit',
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
  templateUrl: './alumno-edit.component.html',
  styleUrls: ['./alumno-edit.component.css']
})
export class AlumnoEditComponent implements OnInit {
  alumno!: Alumno; // Asigna el alumno a editar

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.alumnoService.obtenerAlumnoPorId(id).subscribe(alumno => {
      this.alumno = alumno;
    });
  }

  actualizarAlumno(): void {
    this.alumnoService.actualizarAlumno(this.alumno.id, this.alumno).subscribe(() => {
      alert('Alumno actualizado con éxito');
      this.router.navigate(['/alumnos']); // Navega de vuelta a la lista de alumnos
    });
  }
}
