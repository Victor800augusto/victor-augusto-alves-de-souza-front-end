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
    private autorService: AutorService
  ) {
    if (window.location.href.includes('cria-autor')) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  ngOnInit(): void {
    this.autorForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      biografia: ['', [Validators.required]],
    });
  }

  limparESetarTexto(event: any) {
    this.autorForm.get(event.target.id)?.setValue(this.blurLimparNome(event));
  }

  SalvarAutor() {
    if (this.autorForm.valid) {
      let autor = this.autorForm.getRawValue() as Autor;
      this.autorService.cadastraAutor(autor).subscribe({
        next: () => {
          abreModal('modalFormularioAutores');
          adicionaEventoSairNaModalComDestino(
            'modalFormularioAutores',
            this.route,
            'autores'
          );
        },
        error: (erro) => {
          alert(erro.error.message);
        },
      });
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
