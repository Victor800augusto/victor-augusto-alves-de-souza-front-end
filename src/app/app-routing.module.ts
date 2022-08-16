import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'livros', component: ListarLivrosComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
