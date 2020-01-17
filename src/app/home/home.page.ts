import { Component } from '@angular/core';

import { PhotoService } from './../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  images: any = ["./../../assets/image1.jpg", "./../../assets/image2.jpg", "./../../assets/image3.png"]
  ngOnInit(){
    this.photoService.loadSaved();
    //this.photoService.predictedSaved();
  }
  
  constructor(
    public photoService: PhotoService
    ) {}

}