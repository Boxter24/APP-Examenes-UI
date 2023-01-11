import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, ViewChild, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearCategoriaComponent } from '../modal-crear-categoria/modal-crear-categoria.component';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})

export class CrearCategoriaComponent {

  /*===== Variables =====*/
  categorias: Categoria[] = [];
  categoria?: Categoria;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  displayedColumns: string[] = ['id','titulo', 'descripcion','acciones'];
  dataSource!: MatTableDataSource<Categoria>;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoriaService: CategoriaService,
    public dialog: MatDialog    
  ) {

      this.recargarLista();
    
  }  

  openDialogCrear(accion: string): void {
    this.dialog.open(ModalCrearCategoriaComponent,{
      width: '500px',    
      data: {
        accion: accion        
      }
    });
  }

  openDialogEditar(accion: string, categoriaEdit: Categoria): void {
    this.dialog.open(ModalCrearCategoriaComponent,{
      width: '500px',    
      data: {
        accion: accion,
        categoria: categoriaEdit        
      }
    });        
  }

  eliminarCategoria(id: number): void {
    this.categoriaService.eliminarCategoria(id).subscribe(
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
    this.categoriaService.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
        console.log(data);
        
        
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },(error: any) => {
        Swal.fire('Error!','Error al cargar Categorias','error')
      }
    );  
  }

}