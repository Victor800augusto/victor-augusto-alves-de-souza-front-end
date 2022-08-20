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
import {
  blurLimpaNomes,
  blurLimparIdsAutores,
  blurLimparZeroAEsquerda,
} from '../shared/directives/keypress/blur';

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
  blurLimparZeroAEsquerda: Function = blurLimparZeroAEsquerda;

  edicao: Boolean;
  loading: boolean = true;

  livroParaEdicao!: Livro;
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
      this.edicao = true;
    }
  }

  ngOnInit(): void {
    this.livroForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(200)]],
      anoLancamento: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      autoresIds: ['', [Validators.required]],
    });

    if (this.edicao) {
      this.buscaLivroPeloId();
    }
  }

  buscaLivroPeloId() {
    this.livroService
      .getLivroById(this.activatedRoute.snapshot.params['livroId'])
      .subscribe({
        next: (success) => {
          this.loading = false;
          this.livroParaEdicao = success as Livro;
          this.livroForm.get(['titulo'])?.setValue(this.livroParaEdicao.titulo);
          this.livroForm
            .get(['anoLancamento'])
            ?.setValue(this.livroParaEdicao.anoLancamento.toString());
          let stringIdAutores = '';
          for (let i = 0; i < success.autores.length; i++) {
            if (success.autores.length == i + 1) {
              stringIdAutores += success.autores[i].id;
            } else {
              stringIdAutores += success.autores[i].id + ',';
            }
          }
          this.livroForm.get(['autoresIds'])?.setValue(stringIdAutores);
        },
        error: (error) => {
          alert(error.error.message);
          this.route.navigate(['livros']);
        },
      });
  }

  limparESetarNome(event: any) {
    this.livroForm.get(event.target.id)?.setValue(this.blurLimparNome(event));
  }

  limparESetarIdAutores(event: any) {
    this.livroForm
      .get(event.target.id)
      ?.setValue(this.blurLimparIdAutores(event));
  }

  limparESetarZeroAEsquerda(event: any) {
    this.livroForm
      .get(event.target.id)
      ?.setValue(this.blurLimparZeroAEsquerda(event));
  }

  SalvarLivro() {
    if (this.livroForm.valid) {
      let livro = this.livroForm.getRawValue() as Livro;
      livro.autoresIds = this.livroForm.get('autoresIds')!.value.split(',');
      if (!this.edicao) {
        this.livroService.cadastraLivro(livro).subscribe({
          next: () => {
            abreModal('modalFormularioLivros');
            adicionaEventoSairNaModalComDestino(
              'modalFormularioLivros',
              this.route,
              'livros'
            );
          },
          error: (erro) => {
            alert(erro.error.message);
          },
        });
      } else {
        this.livroService
          .atualizaLivro(this.livroParaEdicao.id, livro)
          .subscribe({
            next: () => {
              abreModal('modalFormularioLivros');
              adicionaEventoSairNaModalComDestino(
                'modalFormularioLivros',
                this.route,
                'livros'
              );
            },
            error: (erro) => {
              alert(erro.error.message);
            },
          });
      }
    } else {
      this.livroForm.markAllAsTouched();
      alert(
        'Um ou mais campos estão inválidos. Faça o preenchimento correto e tente novamente.'
      );
    }
  }

  cancelar() {
    this.route.navigate(['livros']);
  }
}
