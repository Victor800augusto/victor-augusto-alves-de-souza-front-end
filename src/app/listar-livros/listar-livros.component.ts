import { Component, OnInit } from '@angular/core';
import { Livro } from '../models/livro';
import { LivroService } from '../services/livro-service/livro-service.service';

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.css'],
})
export class ListarLivrosComponent implements OnInit {
  livros: Livro[] = [];

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.livroService.getAll().subscribe({
      next: (success) => {
        this.livros = success;
      },
      error: (error) => {
        console.log('deu erro');
      },
    });
  }

  RemoverLivro(livro: Livro) {
    console.log(livro.id);
    this.livroService.removeLivro(livro.id).subscribe({
      next: (success) => {
        console.log(success);
        console.log('livro ' + livro.titulo + 'excluido com sucesso');

      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
