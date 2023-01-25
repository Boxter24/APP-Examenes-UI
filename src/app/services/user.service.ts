import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/routes';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  listarUsuarios(): any{
    return this.http.get(`${baseUrl}/usuarios`);
  }  

  añadirUsuario(user: Usuario): any{
    return this.http.post(`${baseUrl}/usuarios/`,user);
  }  

  actualizarUsuario(user: Usuario): any{
    return this.http.put(`${baseUrl}/usuarios/`,user);
  }  

  eliminarUsuario(usuarioId: any): any{
    return this.http.delete(`${baseUrl}/usuarios/`,usuarioId);
  }  

  cambiarFoto(archivo: File, id: any): any{
    let formData = new FormData();

    formData.append("archivo", archivo);
    formData.append("id",id);
    
    return this.http.post(`${baseUrl}/usuarios/imagen`,formData);
  }

}
