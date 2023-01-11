import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/services/signin.service';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /*===== Variables =====*/
  isLoggedIn = false;
  faPowerOff = faPowerOff

  constructor(public login:SigninService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn()    
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
