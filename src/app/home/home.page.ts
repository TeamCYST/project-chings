import { Component } from '@angular/core';

import { PhotoService } from './../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ngOnInit(){
    this.photoService.loadSaved();
  }

  constructor(
    public photoService: PhotoService
    ) {}

}