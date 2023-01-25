import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/routes';

@Injectable({
  providedIn: 'root'
})
export class ResultadoExamenService {

  constructor(private http: HttpClient) { }

  obtenerResultadosDeExamenes(usuarioId: number): any {
    return this.http.get(`${baseUrl}/resultadosExamenes/${usuarioId}`);
  }

}
