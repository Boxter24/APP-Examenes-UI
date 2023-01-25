import { Injectable } from '@angular/core';
import { UsuarioRol } from './usuarioRol';

@Injectable({
    providedIn: 'root'
})

export class Rol {
    rolId: number = 0; 
    rolNombre: string = '';  
    usuarioRol!: UsuarioRol;
}