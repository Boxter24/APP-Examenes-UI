import { Usuario } from 'src/app/models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/routes';
import { UsuarioRol } from '../models/usuarioRol';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  constructor(private http: HttpClient) { }

  obtenerRolDeUsuario(usuarioId: any): any{
    return this.http.get(`${baseUrl}/usuarioRol/${usuarioId}`)
  }

  actualizarRolDeUsuario(usuarioId: any, usuarioRol: UsuarioRol): any{
    return this.http.put(`${baseUrl}/usuarioRol/${usuarioId}`,usuarioRol)
  }

}
