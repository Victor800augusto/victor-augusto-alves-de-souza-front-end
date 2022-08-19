import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../models/livro';
import { LivroService } from '../services/livro-service/livro-service.service';

@Component({
  selector: 'listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.css'],
})
export class ListarLivrosComponent implements OnInit {
  livros: Livro[] = [];

  constructor(private livroService: LivroService, private route: Router) {}

  ngOnInit(): void {
    this.listarLivros();
  }

  listarLivros() {
    this.livroService.getAll().subscribe({
      next: (success) => {
        this.livros = success;
      },
      error: (error) => {
        console.log('deu erro');
      },
    });
  }

  irParaCadastroDeLivro() {
    this.route.navigate(['cria-livro']);
  }

  irParaAlteracaoDeLivro(livro: Livro) {
    this.route.navigate(['altera-livro', livro.id]);
  }

  RemoverLivro(livro: Livro) {
    console.log(livro.id);
    this.livroService.removeLivro(livro.id).subscribe({
      next: (success) => {
        console.log('livro ' + livro.titulo + 'excluido com sucesso');
        this.listarLivros()
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
