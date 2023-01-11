import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Usuario {
    id: number = 0;
    username: string = '';
    password: string = '';
    nombre: string = '';
    apellido: string = '';
    email: string = '';
    telefono: string = '';
    foto: string = '';
}