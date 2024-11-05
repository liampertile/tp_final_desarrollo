import { Routes } from '@angular/router';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoFormComponent } from './components/curso-form/curso-form.component';
// import { CursoDetailComponent } from './components/curso-detail/curso-detail.component';
import { CursoEditComponent } from './components/curso-edit/curso-edit.component';
import { TemaListComponent } from './components/tema-list/tema-list.component';
import { TemaFormComponent } from './components/tema-form/tema-form.component';
import { TemaEditComponent } from './components/tema-edit/tema-edit.component';

import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { AlumnoFormComponent } from './components/alumno-form/alumno-form.component';
import { AlumnoEditComponent } from './components/alumno-edit/alumno-edit.component';

import { DocenteListComponent } from './components/docente-list/docente-list.component';
import { DocenteFormComponent } from './components/docente-form/docente-form.component';
import { DocenteEditComponent } from './components/docente-edit/docente-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cursos', pathMatch: 'full' },
  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/nuevo', component: CursoFormComponent },
  { path: 'cursos/editar/:id', component: CursoEditComponent },
//   { path: 'cursos/ver/:id', component: CursoDetailComponent },
  { path: 'temas', component: TemaListComponent },
  { path: 'temas/nuevo', component: TemaFormComponent },
  { path: 'temas/editar/:id', component: TemaEditComponent},
  // alumnos
  { path: 'alumnos', component: AlumnoListComponent },
  { path: 'alumnos/nuevo', component: AlumnoFormComponent },
  { path: 'alumnos/editar/:id', component: AlumnoEditComponent},
  // docentes
  { path: 'docentes', component: DocenteListComponent },
  { path: 'docentes/nuevo', component: DocenteFormComponent },
  { path: 'docentes/editar/:id', component: DocenteEditComponent},
];
