import { FormularioAutorComponent } from './formulario-autor/formulario-autor.component';
import { ListarAutoresComponent } from './listar-autores/listar-autores.component';
import { FormularioLivroComponent } from './formulario-livro/formulario-livro.component';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'livros',
  },
  {
    path: 'livros',
    component: ListarLivrosComponent,
  },
  {
    path: 'autores',
    component: ListarAutoresComponent,
  },
  {
    path: 'cadastra-livro',
    component: FormularioLivroComponent,
  },
  {
    path: 'altera-livro/:livroId',
    component: FormularioLivroComponent,
  },
  {
    path: 'cadastra-autor',
    component: FormularioAutorComponent,
  },
  {
    path: 'altera-autor/:autorId',
    component: FormularioAutorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
