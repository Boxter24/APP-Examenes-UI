import { Examen } from './examen';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
})

export class ResultadoExamen {
    resultadoExamenId: number = 0;
    examen: Examen = new Examen();
    usuario: Usuario = new Usuario();
    resultado: number = 0;          
}