import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/routes';
import { Examen } from './../models/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http: HttpClient) { }

  obtenerExamen(examenId: any): any{
    return this.http.get(`${baseUrl}/examen/${examenId}`)
  }

  listarExamenes(): any{
    return this.http.get(`${baseUrl}/examen`)
  }

  listarExamenesDeUnaCategoria(categoriaId: any): any{
    return this.http.get(`${baseUrl}/examen/categoria/${categoriaId}`)
  }

  listarExamenesActivosDeUnaCategoria(categoriaId: any): any{
    return this.http.get(`${baseUrl}/examen/categoria/examenes/${categoriaId}`)
  }

  guardarExamen(examen: Examen): any {
    return this.http.post(`${baseUrl}/examen`, examen);
  }

  actualizarExamen(examen: Examen): any {
    return this.http.put(`${baseUrl}/examen`, examen);
  }

  eliminarExamen(examenId: number): any {
    return this.http.delete(`${baseUrl}/examen/${examenId}`);
  }  

}
