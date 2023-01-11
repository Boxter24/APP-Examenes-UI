import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  /*===== Variables =====*/
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,    
  ) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },(error: any) => {
        Swal.fire('Ooops!','Error al cargar Categorias','error')
      }
    )
  }
}
