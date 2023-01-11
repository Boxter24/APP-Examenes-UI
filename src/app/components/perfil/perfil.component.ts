import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import  {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faEnvelope, faLock, faPhone, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { CambiarFotoService } from 'src/app/services/cambiar-foto.service';
import { SigninService } from 'src/app/services/signin.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  /*===== Variables =====*/
  hide = true;
  usuario!: Usuario;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faPhone = faPhone;  
  faLock = faLock;  
  faPencilAlt = faPencilAlt;
  formMode: boolean = true;  
  signupForm: FormGroup; 

  constructor(
    private _builder: FormBuilder,
    private userService: UserService,
    private dataUser: SigninService,
    private user: Usuario,
    private cambiarFotoService: CambiarFotoService,
    private signinService: SigninService,
  ) {     

    this.usuario = this.dataUser.getUser();

    this.signupForm = this._builder.group({
      username: [this.usuario.username, Validators.required],
      telefono: [this.usuario.telefono, Validators.required],
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      password: ['', Validators.required],
      email: [this.usuario.email, Validators.compose([Validators.email, Validators.required])],
    })

  }



  ngOnInit(): void {        

    //Binding Data
    this.signupForm.controls['username'].valueChanges.subscribe(data => this.user.username = data)
    this.signupForm.controls['password'].valueChanges.subscribe(data => this.user.password = data)
    this.signupForm.controls['nombre'].valueChanges.subscribe(data => this.user.nombre = data)
    this.signupForm.controls['apellido'].valueChanges.subscribe(data => this.user.apellido = data)    
    this.signupForm.controls['telefono'].valueChanges.subscribe(data => this.user.telefono = data)    
    this.signupForm.controls['email'].valueChanges.subscribe(data => this.user.email = data)

    //cambiar foto con cada actulizacion
    this.cambiarFotoService.notificarUpload.subscribe(
      data => {
        this.usuario.foto = data  
        
        this.signinService.setUser(this.usuario)
      }
    )

  }

  noData(data: String): String {
    return " Sin " + data + " registrado.";
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

  cambiarFoto(event: any): void {
    let fotoSeleccionada = event.target.files[0];
    
    this.userService.cambiarFoto(fotoSeleccionada,this.usuario.id).subscribe(
      (data: any) => {
        Swal.fire(
          'Imagen Actualizada',
          'Se cambió la imagen correctamente!!',
          'success'
        ).then(
          (e) => {
            this.cambiarFotoService.notificarUpload.emit(data.archivo);
          }
        ),(error: any)  => {
          Swal.fire('Error!','No se pudo cambiar la imagen.','error')
        };   
      }
    )
  }

  

}
