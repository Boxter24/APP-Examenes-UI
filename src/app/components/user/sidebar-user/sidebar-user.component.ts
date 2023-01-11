import { Component, OnInit } from '@angular/core';
import { CambiarFotoService } from 'src/app/services/cambiar-foto.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {

  /*===== Variables =====*/
  user:any = null;

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

  }

}
