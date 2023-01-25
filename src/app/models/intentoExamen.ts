import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Examen } from './examen';

@Injectable({
    providedIn: 'root'
})

export class IntentoExamen {
    intentoExamenId: number = 0;
    examen: Examen = new Examen();
    usuario: Usuario = new Usuario();    
}