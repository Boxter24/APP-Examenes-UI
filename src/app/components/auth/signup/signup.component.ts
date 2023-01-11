import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import  {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faEnvelope, faLock, faPhone, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  /*===== Variables =====*/
  hide = true;
  faUser = faUser; 
  faEnvelope = faEnvelope; 
  faLock = faLock;
  faPhone = faPhone;
  faPencilAlt = faPencilAlt;
  formMode: boolean = true;  
  signupForm: FormGroup;  

  constructor(
    private _builder: FormBuilder,
    private userService: UserService,
    private user: Usuario
    
  ) {

    this.signupForm = this._builder.group({
      username: ['', Validators.required],
      telefono: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
    })

  } 

  ngOnInit(): void {
    this.signupForm.controls['username'].valueChanges.subscribe(data => this.user.username = data)
    this.signupForm.controls['password'].valueChanges.subscribe(data => this.user.password = data)
    this.signupForm.controls['nombre'].valueChanges.subscribe(data => this.user.nombre = data)
    this.signupForm.controls['apellido'].valueChanges.subscribe(data => this.user.apellido = data)    
    this.signupForm.controls['telefono'].valueChanges.subscribe(data => this.user.telefono = data)    
    this.signupForm.controls['email'].valueChanges.subscribe(data => this.user.email = data)
  }

  /*===== Get Inputs FormGroup =====*/
  get username(){
    return this.signupForm.get('username');
  }

  get telefono(){
    return this.signupForm.get('telefono');
  }

  get nombre(){
    return this.signupForm.get('nombre');
  }

  get apellido(){
    return this.signupForm.get('apellido');
  }

  get password(){
    return this.signupForm.get('password');
  }

  get email(){
    return this.signupForm.get('email');
  }  


  /*===== Validators =====*/
  getErrorMessageRequired() {        
      return 'El campo es requerido.';         
  }

  getErrorMessageEmail() {
    if (this.signupForm.controls['email'].hasError('required')) {      
      return 'Debe ingresar un correo.';
    }
    
    return this.signupForm.controls['email'].hasError('email') ? 'Debe ingresar un correo válido' : '';
  }  

  formSubmit(){
    if(this.signupForm.valid){
      this.userService.añadirUsuario(this.user).subscribe(
        (data: any) => {
          Swal.fire(
            'Usuario guardado',
            'Usuario guardado con éxito en el sistema!!',
            'success'
          )    
        }
      );
    }    
  }

}
