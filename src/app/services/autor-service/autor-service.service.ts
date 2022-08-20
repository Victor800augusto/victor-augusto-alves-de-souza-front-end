import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from 'src/app/models/autor';
import { environment } from 'src/environments/environment';

const URL_API = environment.URL_API + 'autores';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(URL_API);
  }

  getAutorById(id: number): Observable<Autor> {
    return this.http.get<Autor>(URL_API + '/' + id);
  }

  cadastraAutor(autor: Autor) {
    return this.http.post(URL_API, autor);
  }

  atualizaAutor(id: number, autor: Autor) {
    return this.http.put(URL_API + '/' + id, autor);
  }
}
