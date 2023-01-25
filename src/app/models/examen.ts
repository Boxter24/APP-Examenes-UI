import { Injectable } from '@angular/core';
import { Categoria } from './categoria';

@Injectable({
    providedIn: 'root'
})

export class Examen {
    examenId!: number;
    titulo: string = '';
    descripcion: string = '';
    puntosMaximos: number = 0;
    numeroDePreguntas: number = 0;
    intentos: number = 0;
    activo!: boolean;
    categoria!: Categoria;    
}