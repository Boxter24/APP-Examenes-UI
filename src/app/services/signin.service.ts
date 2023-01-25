import { Usuario } from 'src/app/models/usuario';
import { SignData } from './../models/signinData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helpers/routes';
import { Subject } from 'rxjs';
import { CambiarFotoService } from './cambiar-foto.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private cambiarFotoService: CambiarFotoService
  ) { }

  generateToken(signData: SignData): any{    
    return this.http.post(`${baseUrl}/generate-token`,signData);
  }

  //inicio de sesión
  loginUser(token: any){
    localStorage.setItem('token',token);
  }

  isLoggedIn(): boolean{
    let tokenStr = localStorage.getItem('token');

    if(tokenStr == null || tokenStr == undefined || tokenStr == ''){
      return false;
    }
      
    return true;
  }

  //Cierre de Sesión
  logout(): boolean{
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return true;
  }

  //Obtencion del token
  getToken(): any{
    return localStorage.getItem('token');
  }

  setUser(user: any): void{        
    localStorage.setItem('user',JSON.stringify(user));
  }

  getUser(): any{
    let userStr = localStorage.getItem('user');    
    
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  getUserId(): any{
    let userStr = localStorage.getItem('user');    
    
    if(userStr != null){
      let jsonUser: Usuario = JSON.parse(userStr);
      return jsonUser.id;
    }else{
      this.logout();
      return null;
    }
  }

  getUserRole(){
    let user = this.getUser();

    return user.authorities[0].authority;
  }

  getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`);
  }

}
