import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URL_API = environment.URL_API + '/livros';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any>{
    return this.http.get(URL_API);
  }
}
