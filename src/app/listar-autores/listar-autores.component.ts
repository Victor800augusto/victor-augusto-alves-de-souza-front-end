import { Router } from '@angular/router';
import { Autor } from './../models/autor';
import { AutorService } from './../services/autor-service/autor-service.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'listar-autores',
  templateUrl: './listar-autores.component.html',
  styleUrls: ['./listar-autores.component.css'],
})
export class ListarAutoresComponent implements OnInit {
  autores: Autor[] = [];

  loading: Boolean = true;

  constructor(
    private autorService: AutorService,
    private route: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Lista de Autores');
  }

  ngOnInit(): void {
    this.listarAutores();
  }

  listarAutores() {
    this.autorService.getAll().subscribe({
      next: (success) => {
        this.loading = false;
        this.autores = success;
      },
      error: (error) => {
        if (error.error.message) {
          alert(error.error.message);
        } else {
          alert(
            'Houve um erro ao buscar autores, por favor tente novamente mais tarde!'
          );
        }
      },
    });
  }

  irParaCadastroDeAutor() {
    this.route.navigate(['cadastra-autor']);
  }

  irParaAlteracaoDeAutor(autor: Autor) {
    this.route.navigate(['altera-autor', autor.id]);
  }
}
