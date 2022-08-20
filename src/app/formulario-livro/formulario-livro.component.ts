import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro-service/livro-service.service';
import { Livro } from '../models/livro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  keypressApenasNumeros,
  keypressIdsAutores,
} from '../shared/directives/keypress/keypress';
import { blurLimpaNomes, blurLimparIdsAutores } from '../shared/directives/keypress/blur';

declare function abreModal(id: string): any;
declare function adicionaEventoSairNaModalComDestino(
  id: string,
  router: Router,
  destino: string
): any;

@Component({
  selector: 'app-formulario-livro',
  templateUrl: './formulario-livro.component.html',
  styleUrls: ['./formulario-livro.component.css'],
})
export class FormularioLivroComponent implements OnInit {
  apenasNumeros: Function = keypressApenasNumeros;
  keypressIdAutores: Function = keypressIdsAutores;
  blurLimparNome: Function = blurLimpaNomes;
  blurLimparIdAutores: Function = blurLimparIdsAutores;

  edicao: Boolean;

  livroParaEdicao!: Observable<Livro>;
  livroForm!: FormGroup;

  constructor(
    private route: Router,
    private livroService: LivroService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    if (window.location.href.includes('cria-livro')) {
      this.edicao = false;
    } else {
      this.livroParaEdicao = livroService.getLivroById(
        this.activatedRoute.snapshot.params['livroId']
      );
      this.edicao = true;
    }
  }

  ngOnInit(): void {
    this.livroForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      anoLancamento: ['', [Validators.required]],
      autoresIds: ['', [Validators.required]],
    });
  }

  limparESetarNome(event: any) {
    this.livroForm
      .get(event.target.id)
      ?.setValue(this.blurLimparNome(event));
  }

  limparESetarIdAutores(event: any) {
    this.livroForm
      .get(event.target.id)
      ?.setValue(this.blurLimparIdAutores(event));
  }

  SalvarLivro() {
    if (this.livroForm.valid) {
      let novoLivro = this.livroForm.getRawValue() as Livro;
      novoLivro.autoresIds = this.livroForm.get('autoresIds')!.value.split(',');
      this.livroService.cadastraLivro(novoLivro).subscribe({
        next: () => {
          abreModal('modalFormularioLivros');
          adicionaEventoSairNaModalComDestino(
            'modalFormularioLivros',
            this.route,
            'livros'
          );
        },
        error: (erro) => {
          console.log(erro);
          alert(erro.error.message);
        },
      });
    } else {
      this.livroForm.markAllAsTouched();
      alert('Um ou mais campos estão inválidos. Faça o preenchimento correto e tente novamente.')
    }
  }

  cancelar() {
    this.route.navigate(['livros']);
  }
}
