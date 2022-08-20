import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { ListarAutoresComponent } from './listar-autores/listar-autores.component';
import { FormularioLivroComponent } from './formulario-livro/formulario-livro.component';
import { FormularioAutorComponent } from './formulario-autor/formulario-autor.component';
import { MenuComponent } from './menu/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MensagemComponent } from './shared/components/mensagem/mensagem.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarLivrosComponent,
    ListarAutoresComponent,
    FormularioLivroComponent,
    FormularioAutorComponent,
    MenuComponent,
    MensagemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
