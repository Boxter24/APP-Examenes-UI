import Swal from 'sweetalert2';
import { PreguntaService } from './../../../services/pregunta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearPreguntaComponent } from '../modal-crear-pregunta/modal-crear-pregunta.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-pregunta',
  templateUrl: './lista-pregunta.component.html',
  styleUrls: ['./lista-pregunta.component.css']
})
export class ListaPreguntaComponent implements OnInit {

  /*===== Variables =====*/
  examenId!: string;
  preguntas: Pregunta[] = [];
  opcionSeleccionada: any;
  faPlus = faPlus;
  numeroDePreguntas: number = 0;

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.examenId = this.route.snapshot.paramMap.get('examenId')!;

    this.listarPreguntasDelExamen();

  }

  listarPreguntasDelExamen(): void {
    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe(
      (data: any) => {
        this.preguntas = data;
        if(this.preguntas.length > 0){
          this.numeroDePreguntas = this.preguntas[0].examen.numeroDePreguntas;
        }
      }, (error: any) => {
        Swal.fire('Ooops', 'Hubo un error al cargar la información', 'error')
      }
    )
  }

  openDialogCrear(accion: string): void {
    this.dialog.open(ModalCrearPreguntaComponent,{
      width: '500px',    
      data: {
        examenId: this.examenId,
        accion: accion        
      }
    });
  }

  openDialogEditar(accion: string, preguntaEdit: Pregunta): void {
    this.dialog.open(ModalCrearPreguntaComponent,{
      width: '500px',    
      data: {
        accion: accion,
        examenId: this.examenId,
        pregunta: preguntaEdit       
      }
    });
  }

  eliminarPreguntaDelExamen(preguntaId: number): void {
    Swal.fire({
      title: 'Estas seguro de eliminar la pregunta?',
      showDenyButton: true,      
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.preguntaService.eliminarPreguntaDelExamen(preguntaId).subscribe(
          (data: any) => {
            Swal.fire('Eliminada', 'Pregunta eliminada con éxito!!', 'success')
          }, (error: any) => {
            Swal.fire('Ooops', 'Ocurrio un error al elimnar la pregunta.', 'success')
          }
        )
      } else if (result.isDenied) {
        Swal.fire('Cancelado.', 'La pregunta no fue eliminada', 'warning')
      }
    })    
  }

}
