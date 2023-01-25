import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';
import { Examen } from 'src/app/models/examen';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-modal-crear-examen',
  templateUrl: './modal-crear-examen.component.html',
  styleUrls: ['./modal-crear-examen.component.css']
})
export class ModalCrearExamenComponent implements OnInit {

  /*===== Variables =====*/
  form: FormGroup;  
  categorias: Categoria[] = [];  
  valueCategoria: number = 0;  
  categoria: Categoria = new Categoria();

  constructor(
    public dialogRef: MatDialogRef<ModalCrearExamenComponent>,
    private _builder: FormBuilder,
    public examen: Examen,
    private examenService: ExamenService,
    private categoriaService: CategoriaService,        
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {    

    this.form = this._builder.group({
      titulo: ['', Validators.required],
      descripcion: ['', [Validators.required,Validators.maxLength(150)]],      
      puntosMaximos: ['', Validators.required],
      numeroDePreguntas: ['', Validators.required],      
      intentos: ['', Validators.required],
      activo: ['', Validators.required],
      categoria: ['', Validators.required],
    })    
    
    //Rellenado de select CATEGORIAS
    this.categoriaService.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },(error: any) => {
        Swal.fire('Oops...', 'Error al cargar la información', 'error')
      }
    )      
    
    //añadir modelo categoria para creacion de registro
    this.examen.categoria = this.categoria;

  }

  ngOnInit(): void {

    //Vincular input con data a enviar
    this.form.controls['titulo'].valueChanges.subscribe(data => this.examen.titulo = data)
    this.form.controls['descripcion'].valueChanges.subscribe(data => this.examen.descripcion = data)  
    this.form.controls['puntosMaximos'].valueChanges.subscribe(data => this.examen.puntosMaximos = data)
    this.form.controls['numeroDePreguntas'].valueChanges.subscribe(data => this.examen.numeroDePreguntas = data)      
    this.form.controls['intentos'].valueChanges.subscribe(data => this.examen.intentos = data)      
    this.form.controls['activo'].valueChanges.subscribe(data => this.examen.activo = data)    
    this.form.controls['categoria'].valueChanges.subscribe(data => this.examen.categoria.categoriaId = data)        

    //Rellenado de input al editar
    if(this.data.accion == 'Editar'){    
      //añadir modelo categoria a modelo examen
      this.examen.categoria = this.data.examen.categoria;

      this.examen.examenId = this.data.examen.examenId;
      this.form.controls['titulo'].setValue(this.data.examen.titulo);
      this.form.controls['descripcion'].setValue(this.data.examen.descripcion);
      this.form.controls['puntosMaximos'].setValue(this.data.examen.puntosMaximos);
      this.form.controls['numeroDePreguntas'].setValue(this.data.examen.numeroDePreguntas);      
      this.form.controls['intentos'].setValue(this.data.examen.intentos); 
      this.form.controls['activo'].setValue(this.data.examen.activo);
      this.form.controls['categoria'].setValue(this.data.examen.categoria.categoriaId);  
      
      this.valueCategoria = this.examen.categoria.categoriaId!;
    } 
    
  } 

  /*===== Get Inputs FormGroup =====*/
  get titulo(){
    return this.form.get('titulo');
  }

  get descripcion(){
    return this.form.get('descripcion');
  }
  
  get puntosMaximos(){
    return this.form.get('puntosMaximos');
  }

  get numeroDePreguntas(){
    return this.form.get('numeroDePreguntas');
  }

  get intentos(){
    return this.form.get('numeroDePreguntas');
  }

  /*===== Validators =====*/
  getErrorMessageRequired() {        
    return 'El campo es requerido.';         
}

  formSubmit(): void {
    if(this.form.valid){      
      if(this.data.accion == 'Crear'){
        this.examenService.guardarExamen(this.examen).subscribe(
          (data: any) => {
            Swal.fire(
              'Exámen guardado',
              'Exámen guardado con éxito en el sistema!!',
              'success'
            );            
            location.reload();                
            this.dialogRef.close();
          }
        );
      }   
      else{            
        this.examenService.actualizarExamen(this.examen).subscribe(          
          (data: any) => {
            Swal.fire(
              'Exámen Actualizado',
              'Exámen actualizado con éxito!!',
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
