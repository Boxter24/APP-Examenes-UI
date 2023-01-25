import { UsuarioRol } from './usuarioRol';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Usuario {
    id: number = 0;
    username: string = '';
    password: string = '';
    nombreCompleto: string = '';    
    email: string = '';
    telefono: string = '';
    foto: string = '';
    usuarioRol?: UsuarioRol = new UsuarioRol();
    authorities: any;
}