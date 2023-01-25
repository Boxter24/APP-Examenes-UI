import { UsuarioRol } from './../../../../models/usuarioRol';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCrearCategoriaComponent } from 'src/app/components/categoria/modal-crear-categoria/modal-crear-categoria.component';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';
import { UsuarioRolService } from 'src/app/services/usuario-rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-usuario',
  templateUrl: './modal-crear-usuario.component.html',
  styleUrls: ['./modal-crear-usuario.component.css']
})
export class ModalCrearUsuarioComponent implements OnInit {

  /*===== Variables =====*/
  form: FormGroup;
  public roles: Rol[] = [];
  public usuarioRol!: UsuarioRol;

  constructor(
    public dialogRef: MatDialogRef<ModalCrearCategoriaComponent>,
    private _builder: FormBuilder,
    private userService: UserService,
    private rolesService: RolService,
    private usuarioRolService: UsuarioRolService,    
    private usuario: Usuario,    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {   
    
    this.rolesService.listarRoles().subscribe(
      (data: any) => {
        this.roles = data;                
      },(error: any) => {
        Swal.fire('Error!','Error al cargar Roles','error')
      }
    )
        
    this.form = this._builder.group({
      username: ['', Validators.required],
      telefono: ['', Validators.required],
      nombreCompleto: ['', Validators.required],      
      email: ['', Validators.compose([Validators.email, Validators.required])],
      rol: ['', Validators.required],
      password: ['', Validators.required],
    })         

  }

  ngOnInit(): void {
    this.usuarioRol = new UsuarioRol();

    this.form.controls['username'].valueChanges.subscribe(data => this.usuario.username = data)    
    this.form.controls['nombreCompleto'].valueChanges.subscribe(data => this.usuario.nombreCompleto = data)
    this.form.controls['telefono'].valueChanges.subscribe(data => this.usuario.telefono = data)    
    this.form.controls['email'].valueChanges.subscribe(data => this.usuario.email = data)
    this.form.controls['rol'].valueChanges.subscribe(data => this.usuarioRol.rol.rolId = data)        
    this.form.controls['password'].valueChanges.subscribe(data => this.usuario.password = data)    
    
    if(this.data.accion == 'Editar'){      

      this.usuarioRolService.obtenerRolDeUsuario(this.data.usuario.id).subscribe(
        (data: any) => {
          this.usuarioRol = data;
          this.usuarioRol.rol.rolId;
          this.usuarioRol.usuario.authorities = [];

          this.usuario.id = this.data.usuario.id;
          this.form.controls['username'].setValue(this.data.usuario.username);
          this.form.controls['nombreCompleto'].setValue(this.data.usuario.nombreCompleto);
          this.form.controls['telefono'].setValue(this.data.usuario.telefono);
          this.form.controls['email'].setValue(this.data.usuario.email);
          this.form.controls['password'].setValue(this.data.usuario.password);
              
          this.form.controls['rol'].setValue(this.usuarioRol.rol.rolId);          
        },(error: any) => {
          Swal.fire('Error!','Error al cargar Rol del Usuario','error')
        }
      )                         

    }    

  } 

  /*===== Get Inputs FormGroup =====*/
  get username(){
    return this.form.get('username');
  }

  get telefono(){
    return this.form.get('telefono');
  }

  get nombreCompleto(){
    return this.form.get('nombreCompleto');
  }

  get password(){
    return this.form.get('password');
  }

  get email(){
    return this.form.get('email');
  }  

  get rol(){
    return this.form.get('rol');
  }  

  /*===== Validators =====*/
  getErrorMessageRequired() {        
    return 'El campo es requerido.';         
}

  formSubmit(): void {      
    if(this.form.valid){      
      this.usuario.usuarioRol = this.usuarioRol;
      if(this.data.accion == 'Crear'){ 
        
        let role = this.roles.find(element => element.rolId == this.usuarioRol.rol.rolId);
        this.usuario.usuarioRol.rol = role!;
        
        this.userService.añadirUsuario(this.usuario).subscribe(
          (data: any) => {
            Swal.fire(
              'Usuario guardado',
              'Usuario guardado con éxito en el sistema!!',
              'success'
            ).then(
              (e) => {
                location.reload();                
                this.dialogRef.close();
              }
            );   
          }
        );
      }   
      else{               
        this.userService.actualizarUsuario(this.usuario).subscribe(          
          (data: any) => {
            Swal.fire(
              'Usuario Actualizado',
              'Usuario Actualizado con éxito!!',
              'success'
            ).then(
              (e) => {
                location.reload();                
                this.dialogRef.close();
              }
            );                          
          }
        )        
      }         
    }
  }

}
