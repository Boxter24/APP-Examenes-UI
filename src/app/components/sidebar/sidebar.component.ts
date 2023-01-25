import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDrawerMode} from '@angular/material/sidenav';
import { CambiarFotoService } from 'src/app/services/cambiar-foto.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  /*===== Variables =====*/
  mode = new FormControl('over' as MatDrawerMode);
  
  user:any = null;
  rol: any;

  constructor(
    public login:SigninService,
    private cambiarFotoService: CambiarFotoService
  ) { }

  ngOnInit(): void {    
    this.user = this.login.getUser();   
    
    //cambiar foto con cada actulizacion
    this.cambiarFotoService.notificarUpload.subscribe(
      data => {
        this.user.foto = data        
      }
    )

    this.rol = this.user.authorities[0].authority;
    

  }

}
