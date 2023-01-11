import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  /*===== Variables =====*/
  hideLoader = new Subject<boolean>();

  mostrarLoader(): void {
    this.hideLoader.next(true);
  }

  ocultarLoader(): void {
    this.hideLoader.next(false);
  }
  
}
