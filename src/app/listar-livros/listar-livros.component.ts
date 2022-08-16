import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro-service/livro-service.service';

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.css'],
})
export class ListarLivrosComponent implements OnInit {
  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.livroService.getAll().subscribe({
      next: (success) => {
        console.log(success);
      },
    });
  }
}
