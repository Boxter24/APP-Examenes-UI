import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/routes';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http: HttpClient) { }

  listarPreguntasDelExamen(examenId: string): any {
    return this.http.get(`${baseUrl}/pregunta/examen/${examenId}`);
  }

  guardarPreguntasDelExamen(pregunta: Pregunta): any {
    return this.http.post(`${baseUrl}/pregunta`, pregunta);
  }

  actualizarPreguntasDelExamen(pregunta: Pregunta): any {
    return this.http.put(`${baseUrl}/pregunta`, pregunta);
  }

  eliminarPreguntaDelExamen(preguntaId: number): any {
    return this.http.delete(`${baseUrl}/pregunta/${preguntaId}`);
  }

}
