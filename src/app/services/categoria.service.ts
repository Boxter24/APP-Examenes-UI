import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/routes';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  listarCategorias(): any{
    return this.http.get(`${baseUrl}/categoria`)
  }

  guardarCategoria(categoria: Categoria): any {
    return this.http.post(`${baseUrl}/categoria`, categoria);
  }

  actualizarCategoria(categoria: Categoria): any {
    return this.http.put(`${baseUrl}/categoria`, categoria);
  }

  eliminarCategoria(categoriaId: number): any {
    return this.http.delete(`${baseUrl}/categoria/${categoriaId}`);
  }

}
