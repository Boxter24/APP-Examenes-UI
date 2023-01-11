import { PreguntaService } from './../../../services/pregunta.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCrearCategoriaComponent } from '../../categoria/modal-crear-categoria/modal-crear-categoria.component';
import Swal from 'sweetalert2';
import { Pregunta } from 'src/app/models/pregunta';
import { Examen } from 'src/app/models/examen';

@Component({
  selector: 'app-modal-crear-pregunta',
  templateUrl: './modal-crear-pregunta.component.html',
  styleUrls: ['./modal-crear-pregunta.component.css']
})
export class ModalCrearPreguntaComponent implements OnInit {

  /*===== Variables =====*/
  form: FormGroup;
  examen: Examen = new Examen();
  examenId!: number;

  constructor(    
    public dialogRef: MatDialogRef<ModalCrearCategoriaComponent>,
    private _builder: FormBuilder,
    public pregunta: Pregunta,
    private preguntaService: PreguntaService, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

    this.form = this._builder.group({
      contenido: ['', Validators.required],
      opcion1: ['', Validators.required],      
      opcion2: ['', Validators.required],      
      opcion3: ['', Validators.required],      
      opcion4: ['', Validators.required],      
      respuesta: ['', Validators.required],                
    }) 

    //añadir modelo examen para creacion de registro
    this.pregunta.examen = this.examen      
    this.pregunta.examen.examenId = this.data.examenId;

  }

  ngOnInit(): void {

    this.form.controls['contenido'].valueChanges.subscribe(data => this.pregunta.contenido = data)
    this.form.controls['opcion1'].valueChanges.subscribe(data => this.pregunta.opcion1 = data)    
    this.form.controls['opcion2'].valueChanges.subscribe(data => this.pregunta.opcion2 = data)    
    this.form.controls['opcion3'].valueChanges.subscribe(data => this.pregunta.opcion3 = data)    
    this.form.controls['opcion4'].valueChanges.subscribe(data => this.pregunta.opcion4 = data)    
    this.form.controls['respuesta'].valueChanges.subscribe(data => this.pregunta.respuesta = data)    

    if(this.data.accion == 'Editar'){      
      this.pregunta.preguntaId = this.data.pregunta.preguntaId;
      this.form.controls['contenido'].setValue(this.data.pregunta.contenido);
      this.form.controls['opcion1'].setValue(this.data.pregunta.opcion1);
      this.form.controls['opcion2'].setValue(this.data.pregunta.opcion2);
      this.form.controls['opcion3'].setValue(this.data.pregunta.opcion3);
      this.form.controls['opcion4'].setValue(this.data.pregunta.opcion4);
      this.form.controls['respuesta'].setValue(this.data.pregunta.respuesta);          

    }else{
      this.form.reset();
    }

  }

  /*===== Get Inputs FormGroup =====*/
  get contenido(){
    return this.form.get('contenido');
  }

  get opcion1(){
    return this.form.get('opcion1');
  }

  get opcion2(){
    return this.form.get('opcion2');
  }

  get opcion3(){
    return this.form.get('opcion3');
  }

  get opcion4(){
    return this.form.get('opcion4');
  }

  get respuesta(){
    return this.form.get('respuesta');
  }

  /*===== Validators =====*/
  getErrorMessageRequired() {        
    return 'El campo es requerido.';         
}

  formSubmit(): void {
    if(this.form.valid){      
      if(this.data.accion == 'Crear'){                
        this.preguntaService.guardarPreguntasDelExamen(this.pregunta).subscribe(
          (data: any) => {
            Swal.fire(
              'Pregunta guardada',
              'Pregunta guardada con éxito en el sistema!!',
              'success'
            ).then(
              (e) => {
                location.reload();                                
              }
            );   
          }
        );
      }   
      else{        
        this.preguntaService.actualizarPreguntasDelExamen(this.pregunta).subscribe(          
          (data: any) => {
            Swal.fire(
              'Pregunta Actualizada',
              'Pregunta actualizada con éxito!!',
              'success'
            ).then(
              (e) => {
                location.reload();                                
              }
            );    
          }
        )
      }         
    } 
  }  

}
