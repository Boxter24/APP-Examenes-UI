import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-examenes-por-categoria',
  templateUrl: './examenes-por-categoria.component.html',
  styleUrls: ['./examenes-por-categoria.component.css']
})
export class ExamenesPorCategoriaComponent implements OnInit {

  /*===== Variables =====*/
  categoriaId!: string;
  examenes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService,    
  ) { }

  ngOnInit(): void {

    this.categoriaId = this.route.snapshot.paramMap.get('categoriaId')!;
    
    this.examenService.listarExamenesActivosDeUnaCategoria(this.categoriaId).subscribe(
      (data: any) => {
        this.examenes = data;
      },(error: any) => {
        Swal.fire('Ooops','error al cargar los exámenes de la categoria.','error');
      }
    )

  }

}
