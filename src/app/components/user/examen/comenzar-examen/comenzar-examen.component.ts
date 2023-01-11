import { LocationStrategy } from '@angular/common';
import { Pregunta } from './../../../../models/pregunta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comenzar-examen',
  templateUrl: './comenzar-examen.component.html',
  styleUrls: ['./comenzar-examen.component.css']
})
export class ComenzarExamenComponent implements OnInit {

  examnenId: any;
  preguntas: Pregunta[] = [];
  respuestasCorrectas = 0;
  puntosConseguidos = 0;
  timer:any;
  faClock = faClock;
  mostrarTemporizadorMobile = true;
  enviado = false;

  constructor(
    private locationSt:LocationStrategy,
    public examen: Examen,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) { }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();

    this.examnenId = this.route.snapshot.paramMap.get('examenId')!;
    this.preguntaService.listarPreguntasDelExamen(this.examnenId).subscribe(
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

}
