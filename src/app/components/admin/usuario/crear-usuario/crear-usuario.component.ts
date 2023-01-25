import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ModalCrearUsuarioComponent } from './../modal-crear-usuario/modal-crear-usuario.component';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {

  /*===== Variables =====*/
  usuarios: Usuario[] = [];
  usuario?: Usuario;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  displayedColumns: string[] = ['id','fullname', 'username','telefono','email','acciones'];
  dataSource!: MatTableDataSource<Usuario>;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UserService,
    public dialog: MatDialog    
  ) {

      this.recargarLista();
    
  }  

  openDialogCrear(accion: string): void {
    this.dialog.open(ModalCrearUsuarioComponent,{
      width: '500px',    
      data: {
        accion: accion        
      }
    });
  }

  openDialogEditar(accion: string, usuario: Usuario): void {
    this.dialog.open(ModalCrearUsuarioComponent,{
      width: '500px',    
      data: {
        accion: accion,
        usuario: usuario        
      }
    });        
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminarUsuario(id).subscribe(
      (data: any) => {
        Swal.fire(
          'Usuario Eliminado',
          'Usuario eliminado con éxito!!',
          'success'
        );                    
      },(error: any) => {
        Swal.fire('Error', 'Error al eliminar el usuario!!', 'error');
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
    this.usuarioService.listarUsuarios().subscribe(
      (data: any) => {
        this.usuarios = data;                
        
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },(error: any) => {
        Swal.fire('Error!','Error al cargar Usuarios','error')
      }
    );  
  }

}
