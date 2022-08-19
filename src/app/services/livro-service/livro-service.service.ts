import { Livro } from './../../models/livro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URL_API = environment.URL_API + 'livros';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(URL_API);
  }

  getLivroById(id:number): Observable<Livro> {
    return this.http.get<Livro>(URL_API)
  }

  removeLivro(id: number): Observable<void> {
    return this.http.delete<void>(URL_API + '/' + id);
  }
}
