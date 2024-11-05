import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../models/tema.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tema-edit',
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
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {
  tema!: Tema; // Asigna el tema a editar

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private temaService: TemaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.temaService.obtenerTemaPorId(id).subscribe(tema => {
      this.tema = tema;
    });
  }

  actualizarTema(): void {
    this.temaService.actualizarTema(this.tema.id, this.tema).subscribe(() => {
      alert('Tema actualizado con éxito');
      this.router.navigate(['/temas']); // Navega de vuelta a la lista de temas
    });
  }
}
