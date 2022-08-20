import { Router } from '@angular/router';
import { Autor } from './../models/autor';
import { AutorService } from './../services/autor-service/autor-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'listar-autores',
  templateUrl: './listar-autores.component.html',
  styleUrls: ['./listar-autores.component.css'],
})
export class ListarAutoresComponent implements OnInit {
  autores: Autor[] = [];

  constructor(private autorService: AutorService, private route: Router) {}

  ngOnInit(): void {
    this.listarAutores();
  }

  listarAutores() {
    this.autorService.getAll().subscribe({
      next: (success) => {
        this.autores = success;
      },
      error: (error) => {
        console.log('deu erro');
      },
    });
  }

  irParaCadastroDeAutor() {
    this.route.navigate(['cria-autor']);
  }

  irParaAlteracaoDeAutor(autor: Autor) {
    this.route.navigate(['altera-autor', autor.id]);
  }
}
