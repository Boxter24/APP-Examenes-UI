import { Injectable } from '@angular/core';
import { Examen } from './examen';

@Injectable({
    providedIn: 'root'
})

export class Pregunta {
    preguntaId!: number;
    contenido: string = '';
    imagen: string = '';
    opcion1: string = '';
    opcion2: string = '';
    opcion3: string = '';
    opcion4: string = '';
    respuesta: string = '';
    respuestaDada: string = '';    
    examen!: Examen;
}