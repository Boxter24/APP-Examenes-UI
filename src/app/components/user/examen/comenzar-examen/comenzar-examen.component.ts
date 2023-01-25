import { LocationStrategy } from '@angular/common';
import { Pregunta } from './../../../../models/pregunta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { ResultadoExamen } from 'src/app/models/resultadoExamen';
import { ExamenService } from 'src/app/services/examen.service';
import { SigninService } from 'src/app/services/signin.service';
import { IntentoExamen } from 'src/app/models/intentoExamen';
import { Usuario } from 'src/app/models/usuario';
import { IntentoExamenService } from 'src/app/services/intento-examen.service';

@Component({
  selector: 'app-comenzar-examen',
  templateUrl: './comenzar-examen.component.html',
  styleUrls: ['./comenzar-examen.component.css']
})
export class ComenzarExamenComponent implements OnInit {
  
  preguntas: Pregunta[] = [];
  respuestasCorrectas = 0;
  puntosConseguidos = 0;
  timer:any;
  faClock = faClock;
  mostrarTemporizadorMobile = true;
  enviado = false;
  resultadoExamen: ResultadoExamen = new ResultadoExamen();  
  private examenId: any;  
  private user!: Usuario;  
  private numeroDeIntentos!: number 
  public intentoExamen!: IntentoExamen; 

  constructor(
    private router: Router,
    public examen: Examen,
    private locationSt:LocationStrategy,    
    private route: ActivatedRoute,
    private examenService: ExamenService,
    private preguntaService: PreguntaService,
    private signinService: SigninService,
    private intentoExamenService: IntentoExamenService,
  ) { }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();

    this.examenId = this.route.snapshot.paramMap.get('examenId')!;    

    this.examenService.obtenerExamen(this.examenId).subscribe(
      (data: any) => {
        this.examen = data
      },(error: any) => {
        Swal.fire('Ooops', 'Hubo un error al cargar la información', 'error')
      }
    )

    this.user = this.signinService.getUserId();
    this.user.authorities = [];
    this.intentoExamen = new IntentoExamen();
    this.conteoIntentosExamen();    

    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe(
      (data: any) => {
        this.preguntas = data;
        
        this.timer = this.preguntas.length *2 * 60;
        this.iniciarTemporizador();
      },(error: any) => {
        Swal.fire('Ooops','Error al cargar preguntas del exámen','error')
      }
    )

  }

  prevenirElBotonDeRetroceso(){
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null,null!,location.href);
    })    
  }

  evaluarExamen(): any {
    this.respuestasCorrectas = 0;
    this.puntosConseguidos = 0;

    this.preguntas.forEach((p:any) => {
      if(p.respuestaDada == p.respuesta){
        this.respuestasCorrectas ++;
        let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
        this.puntosConseguidos += puntos;
      }
    })

    this.puntosConseguidos = Math.round(this.puntosConseguidos);

    this.resultadoExamen.examen.examenId = this.examenId;
    this.resultadoExamen.usuario = this.signinService.getUser();
    this.resultadoExamen.usuario.authorities = [];
    this.resultadoExamen.resultado = this.puntosConseguidos;     

    this.examenService.evaluarExamen(this.resultadoExamen).subscribe(
      (data: any) => {
        console.log(data);
        
      },(error: any) => {
        Swal.fire('Ooops', 'Hubo un error al cargar la información', 'error')
      }
    )


    this.enviado = true;
  }

  iniciarTemporizador(){
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.evaluarExamen();
        clearInterval(t);
      }else{
        this.timer --;
      }
    },1000)
  }

  obtenerHoraFormateada(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} : min : ${ss} seg`;
  }

  abrirTemporizadorMobile(){
    this.mostrarTemporizadorMobile = !this.mostrarTemporizadorMobile;        
  }

  imprimirPagina(){
    window.print();
  }

  conteoIntentosExamen(): void {        
    this.intentoExamenService.conteoIntentosExamen(this.examenId,this.user.id).subscribe(
      (data: any) => {
        this.numeroDeIntentos = data;

        if(this.examen.intentos == this.numeroDeIntentos){
          this.router.navigate(['/user/examen/instrucciones/'+this.examenId])
        }

        this.intentoExamen.usuario.id = this.user.id;
        this.intentoExamen.examen.examenId = this.examenId;
        this.intentoExamenService.guardarIntentoExamen(this.intentoExamen).subscribe(
          (data: any) => {
            console.log(data);
            
          },(error: any) => {

          }
        )
      },(error: any) => {
        Swal.fire('Ooops', 'Hubo un error al cargar la información', 'error')
      }
    )
  }

}
