import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import  { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-categoria',
  templateUrl: './modal-crear-categoria.component.html',
  styleUrls: ['./modal-crear-categoria.component.css']
})
export class ModalCrearCategoriaComponent implements OnInit {

  /*===== Variables =====*/
  form: FormGroup;
  

  constructor(
    public dialogRef: MatDialogRef<ModalCrearCategoriaComponent>,
    private _builder: FormBuilder,
    private categoria: Categoria,
    private categoriaService: CategoriaService, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this._builder.group({
      titulo: ['', Validators.required],
      descripcion: ['', [Validators.required,Validators.maxLength(150)]],      
    })            

  }

  ngOnInit(): void {
    this.form.controls['titulo'].valueChanges.subscribe(data => this.categoria.titulo = data)
    this.form.controls['descripcion'].valueChanges.subscribe(data => this.categoria.descripcion = data)    

    if(this.data.accion == 'Editar'){      
      this.categoria.categoriaId = this.data.categoria.categoriaId;
      this.form.controls['titulo'].setValue(this.data.categoria.titulo);
      this.form.controls['descripcion'].setValue(this.data.categoria.descripcion);
    }    
  } 

  /*===== Get Inputs FormGroup =====*/
  get titulo(){
    return this.form.get('titulo');
  }

  get descripcion(){
    return this.form.get('descripcion');
  }

  /*===== Validators =====*/
  getErrorMessageRequired() {        
    return 'El campo es requerido.';         
}

  formSubmit(): void {
    if(this.form.valid){      
      if(this.data.accion == 'Crear'){
        this.categoriaService.guardarCategoria(this.categoria).subscribe(
          (data: any) => {
            Swal.fire(
              'Categoria guardada',
              'Categoria guardada con éxito en el sistema!!',
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
        this.categoriaService.actualizarCategoria(this.categoria).subscribe(          
          (data: any) => {
            Swal.fire(
              'Categoria Actualizada',
              'Categoria actualizada con éxito!!',
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
