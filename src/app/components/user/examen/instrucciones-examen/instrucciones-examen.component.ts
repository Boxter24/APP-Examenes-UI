import { Usuario } from 'src/app/models/usuario';
import { IntentoExamen } from './../../../../models/intentoExamen';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from './../../../../models/examen';
import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';
import { IntentoExamenService } from 'src/app/services/intento-examen.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-instrucciones-examen',
  templateUrl: './instrucciones-examen.component.html',
  styleUrls: ['./instrucciones-examen.component.css']
})
export class InstruccionesExamenComponent implements OnInit {

  private examenId: any;  
  private user!: Usuario;  
  private numeroDeIntentos!: number 
  public intentoExamen!: IntentoExamen;

  constructor(
    public examen: Examen,    
    private route: ActivatedRoute,
    private router: Router,
    private examenService: ExamenService,
    private signinService: SigninService,
    private intentoExamenService: IntentoExamenService  
  ) { 
    this.examenId = this.route.snapshot.paramMap.get('examenId')!;
  }

  ngOnInit(): void {    
    this.user = this.signinService.getUserId();

    this.examenService.obtenerExamen(this.examenId).subscribe(
      (data: any) => {
        this.examen = data
      },(error: any) => {
        Swal.fire('Ooops', 'Hubo un error al cargar la información', 'error')
      }
    )

    this.conteoIntentosExamen();    

  }

  get numeroDeIntentosExamen(){
    return this.numeroDeIntentos;
  }
  

  empezarExamen(): any{
    Swal.fire({
      title: 'Estas seguro de empezar el exámen?',
      showDenyButton: true,      
      confirmButtonText: 'Sí',
      denyButtonText: `Cancelar`,
    }).then((result) => {      
      if (result.isConfirmed) {        
        this.router.navigate(['/user/comenzar-examen/'+this.examenId])
      }
    })   
  }

  conteoIntentosExamen(): void {        
    this.intentoExamenService.conteoIntentosExamen(this.examenId,this.user.id).subscribe(
      (data: any) => {
        this.numeroDeIntentos = data;
      },(error: any) => {
        Swal.fire('Ooops', 'Hubo un error al cargar la información', 'error')
      }
    )
  }

}
