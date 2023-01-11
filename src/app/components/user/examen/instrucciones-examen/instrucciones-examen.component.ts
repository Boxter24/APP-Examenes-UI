import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from './../../../../models/examen';
import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-instrucciones-examen',
  templateUrl: './instrucciones-examen.component.html',
  styleUrls: ['./instrucciones-examen.component.css']
})
export class InstruccionesExamenComponent implements OnInit {

  examnenId: any;

  constructor(
    public examen: Examen,
    private route: ActivatedRoute,
    private router: Router,
    private examenService: ExamenService
  ) { }

  ngOnInit(): void {

    this.examnenId = this.route.snapshot.paramMap.get('examenId')!;

    this.examenService.obtenerExamen(this.examnenId).subscribe(
      (data: any) => {
        this.examen = data
      },(error: any) => {

      }
    )

  }

  empezarExamen(): any{
    Swal.fire({
      title: 'Estas seguro de empezar el exámen?',
      showDenyButton: true,      
      confirmButtonText: 'Sí',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/user/comenzar-examen/'+this.examnenId])
      }
    })   
  }

}
