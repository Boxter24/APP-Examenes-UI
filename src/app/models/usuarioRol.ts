import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Rol } from './rol';

@Injectable({
    providedIn: 'root'
})

export class UsuarioRol {
    usuarioRolId!: number; 
    usuario!: Usuario;  
    rol: Rol = new Rol();  
}