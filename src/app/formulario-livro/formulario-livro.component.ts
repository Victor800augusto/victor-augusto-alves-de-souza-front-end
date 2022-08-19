import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro-service/livro-service.service';
import { Livro } from '../models/livro';

@Component({
  selector: 'app-formulario-livro',
  templateUrl: './formulario-livro.component.html',
  styleUrls: ['./formulario-livro.component.css'],
})
export class FormularioLivroComponent implements OnInit {
  edicao: Boolean;

  livroParaEdicao!: Observable<Livro>;

  constructor(
    private route: Router,
    private livroService: LivroService,
    private activatedRoute: ActivatedRoute
  ) {
    if (window.location.href.includes('cria-livro')) {
      this.edicao = false;
    } else {
      this.livroParaEdicao = livroService.getLivroById(this.activatedRoute.snapshot.params['livroId']);
      this.edicao = true;
    }
  }

  ngOnInit(): void {}
}
