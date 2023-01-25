import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faPlus, faTrash, faEdit, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearExamenComponent } from './../modal-crear-examen/modal-crear-examen.component';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-examen',
  templateUrl: './crear-examen.component.html',
  styleUrls: ['./crear-examen.component.css']
})

export class CrearExamenComponent {

  /*===== Variables =====*/
  examenes: Examen[] = [];
  examen?: Examen;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  displayedColumns: string[] = ['id','titulo', 'descripcion','puntosMaximos','numeroDePreguntas','categoria','intentos','preguntas','estado','acciones'];
  dataSource!: MatTableDataSource<Examen>;     

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private examenService: ExamenService,
    public dialog: MatDialog    
  ) {

    this.recargarLista(); 
    
  }

  openDialogCrear(accion: string): void {
    this.dialog.open(ModalCrearExamenComponent,{
      width: '500px',    
      data: {
        accion: accion       
      }
    });
  }

  openDialogEditar(accion: string, examenEdit: Examen): void {
    this.dialog.open(ModalCrearExamenComponent,{
      width: '500px',    
      data: {
        accion: accion,
        examen: examenEdit        
      }
    });        
  }

  eliminarExamen(id: number): void {
    this.examenService.eliminarExamen(id).subscribe(
      (data: any) => {
        Swal.fire(
          'Categoria Eliminada',
          'Categoria eliminada con éxito!!',
          'success'
        );                    
      },(error: any) => {
        Swal.fire('Error', 'Error al eliminar la categoria!!', 'error');
      }
    );    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
  
  recargarLista(): void {
    this.examenService.listarExamenes().subscribe(
      (data: any) => {
        this.examenes = data;                
        
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },(error: any) => {
        Swal.fire('Ooops!','Error al cargar Examenes','error')
      }
    );  
  }  
}
