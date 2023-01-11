import { Component, OnInit } from '@angular/core';
import  {FormControl, Validators } from '@angular/forms';
import { faUser, faEnvelope, faLock, faPhone, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  /*===== Variables =====*/
  hide = true;
  faUser = faUser; 
  faEnvelope = faEnvelope; 
  faLock = faLock;
  faPhone = faPhone;
  faPencilAlt = faPencilAlt;
  formMode: boolean = true;  

  constructor() { }

  ngOnInit(): void {
  }  

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {      
      return 'Debe ingresar un correo.';
    }
    
    return this.email.hasError('email') ? 'Debe ingresar un correo válido' : '';
  }

  form(): void{
    this.formMode = !this.formMode;       
  }

}
