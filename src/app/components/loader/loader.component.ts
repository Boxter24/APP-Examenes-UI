import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

export class LoaderComponent implements OnInit {    

  /*===== Variables =====*/
  public hide = this.loaderService.hideLoader;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }      

}
