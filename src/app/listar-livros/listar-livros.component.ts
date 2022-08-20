import { Title } from '@angular/platform-browser';
import { Livro } from './../models/livro';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivroService } from '../services/livro-service/livro-service.service';

declare function abreModal(id: string): any;

@Component({
  selector: 'listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.css'],
})
export class ListarLivrosComponent implements OnInit {
  livros: Livro[] = [];

  idLivroParaExclusao!: number;
  tituloLivroParaExclusao!: string;

  constructor(
    private livroService: LivroService,
    private route: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Lista de Livros')
  }

  ngOnInit(): void {
    this.listarLivros();
  }

  listarLivros() {
    this.livroService.getAll().subscribe({
      next: (success) => {
        this.livros = success;
      },
      error: (error) => {
        if(error.error.message){
          alert(error.error.message);
        }else{
          alert('Houve um erro ao buscar livros, por favor tente novamente mais tarde!')
        }
      },
    });
  }

  irParaCadastroDeLivro() {
    this.route.navigate(['cria-livro']);
  }

  irParaAlteracaoDeLivro(livro: Livro) {
    this.route.navigate(['altera-livro', livro.id]);
  }

  abrirConfirmacaoDeExclusaoDeLivro(livro: Livro) {
    this.idLivroParaExclusao = livro.id;
    this.tituloLivroParaExclusao = livro.titulo;
    abreModal('modalConfirmacaoExclusao');
  }

  removerLivro() {
    this.livroService.removeLivro(this.idLivroParaExclusao).subscribe({
      next: (success) => {
        abreModal('modalLivros');
        this.listarLivros();
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }
}
