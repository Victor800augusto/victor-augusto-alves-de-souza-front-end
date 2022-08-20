import { Title } from '@angular/platform-browser';
import { AutorService } from './../services/autor-service/autor-service.service';
import { Autor } from './../models/autor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { blurLimpaNomes } from '../shared/directives/keypress/blur';

declare function abreModal(id: string): any;
declare function adicionaEventoSairNaModalComDestino(
  id: string,
  router: Router,
  destino: string
): any;

@Component({
  selector: 'app-formulario-autor',
  templateUrl: './formulario-autor.component.html',
  styleUrls: ['./formulario-autor.component.css'],
})
export class FormularioAutorComponent implements OnInit {
  blurLimparNome: Function = blurLimpaNomes;

  edicao: Boolean;
  loading: boolean = true;

  autorParaEdicao!: Autor;

  autorForm!: FormGroup;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private autorService: AutorService,
    private titleService: Title
  ) {
    if (window.location.href.includes('cadastra-autor')) {
      this.titleService.setTitle('Cadastro de autor');
      this.edicao = false;
    } else {
      this.titleService.setTitle('Edição de autor');
      this.edicao = true;
    }
  }

  ngOnInit(): void {
    this.autorForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      biografia: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    if (this.edicao) {
      this.buscaAutorPeloId();
    }
  }

  buscaAutorPeloId() {
    this.autorService
      .getAutorById(this.activatedRoute.snapshot.params['autorId'])
      .subscribe({
        next: (success) => {
          this.loading = false;
          this.autorParaEdicao = success as Autor;
          this.autorForm.get(['nome'])?.setValue(this.autorParaEdicao.nome);
          this.autorForm
            .get(['biografia'])
            ?.setValue(this.autorParaEdicao.biografia);
        },
        error: (error) => {
          if(error.error.message){
            alert(error.error.message);
          }else{
            alert('Houve um erro ao buscar autor, por favor tente novamente mais tarde!')
          }
          this.route.navigate(['autores']);
        },
      });
  }

  limparESetarTexto(event: any) {
    this.autorForm.get(event.target.id)?.setValue(this.blurLimparNome(event));
  }

  SalvarAutor() {
    if (this.autorForm.valid) {
      let autor = this.autorForm.getRawValue() as Autor;
      if (!this.edicao) {
        this.autorService.cadastraAutor(autor).subscribe({
          next: () => {
            abreModal('modalFormularioAutores');
            adicionaEventoSairNaModalComDestino(
              'modalFormularioAutores',
              this.route,
              'autores'
            );
          },
          error: (error) => {
            if(error.error.message){
              alert(error.error.message);
            }else{
              alert('Houve um erro ao cadastrar autor, por favor tente novamente mais tarde!')
            }
          },
        });
      } else {
        this.autorService
          .atualizaAutor(this.autorParaEdicao.id, autor)
          .subscribe({
            next: () => {
              abreModal('modalFormularioAutores');
              adicionaEventoSairNaModalComDestino(
                'modalFormularioAutores',
                this.route,
                'autores'
              );
            },
            error: (error) => {
              if(error.error.message){
                alert(error.error.message);
              }else{
                alert('Houve um erro ao editar autor, por favor tente novamente mais tarde!')
              }
            },
          });
      }
    } else {
      this.autorForm.markAllAsTouched();
      alert(
        'Um ou mais campos estão inválidos. Faça o preenchimento correto e tente novamente.'
      );
    }
  }

  cancelar() {
    this.route.navigate(['autores']);
  }
}
