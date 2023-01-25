import { IntentoExamen } from './../models/intentoExamen';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/routes';

@Injectable({
  providedIn: 'root'
})
export class IntentoExamenService {

  constructor(private http: HttpClient) { }  

  conteoIntentosExamen(examenId: number, usuarioId: number): any {
    return this.http.get(`${baseUrl}/intentosExamenes/${examenId}/${usuarioId}`);
  }

  conteoIntentosGenerales(usuarioId: number): any {
    return this.http.get(`${baseUrl}/intentosExamenes/${usuarioId}`);
  }

  guardarIntentoExamen(intentoExamen: IntentoExamen): any {
    return this.http.post(`${baseUrl}/intentosExamenes`,intentoExamen);
  }

}
