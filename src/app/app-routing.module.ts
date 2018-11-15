import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosComponent } from './components/cursos/cursos.component';
import { AddCursoComponent } from './components/add-curso/add-curso.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path:'', component: AuthComponent},
  {path:'cursos', component: CursosComponent},
  {path:'cursos/new', component: AddCursoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [CursosComponent, AddCursoComponent, AuthComponent]
