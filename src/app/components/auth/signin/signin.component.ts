import { Component, OnInit } from '@angular/core';
import  {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { SignData } from 'src/app/models/signinData';
import { SigninService } from 'src/app/services/signin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  /*===== Variables =====*/
  hide = true;   
  faUser = faUser; 
  faLock = faLock;
  signinForm: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private signinData: SignData, 
    private signinService: SigninService,
    private router:Router
  ) {

    this.signinForm = this._builder.group({     
      username: ['', Validators.required],
      password: ['', Validators.required],      
    })

  } 

  ngOnInit(): void {
    this.signinForm.controls['username'].valueChanges.subscribe(data => this.signinData.username = data)
    this.signinForm.controls['password'].valueChanges.subscribe(data => this.signinData.password = data)    
  }
  
  /*===== Get Inputs FormGroup =====*/
  get username(){
    return this.signinForm.get('username');
  }  
  
  get password(){
    return this.signinForm.get('password');
  }  

  /*===== Validators =====*/
  getErrorMessageRequired() {        
      return 'El campo es requerido.';         
  }  

  /*===== Functions =====*/
  formSubmit(){
    if(this.signinForm.valid){
      this.signinService.generateToken(this.signinData).subscribe(
        (data: any) => {          
          
          this.signinService.loginUser(data.token);
          this.signinService.getCurrentUser().subscribe(
            (user: any) => {
              this.signinService.setUser(user);              
  
              if(this.signinService.getUserRole() == 'ADMIN'){
                //Dashboard Admin
                //window.location.href = '/admin';
                this.router.navigate(['admin']);
                this.signinService.loginStatusSubjec.next(true);
              }
              else if(this.signinService.getUserRole() == 'NORMAL'){
                //Dashboard User
                //window.location.href = '/user-dashboard';
                this.router.navigate(['user']);
                this.signinService.loginStatusSubjec.next(true);
              }
              else{
                this.signinService.logout();
                console.log("logout");
                
              }
  
              
            });
        },(error: any) => {
          console.log(error);        
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'Detalles Inválidos.'
          })
        }
      );
    }    
  }

}
