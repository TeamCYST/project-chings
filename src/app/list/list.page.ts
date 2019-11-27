import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from './../services/photo.service';

import * as cocoSsd from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  current: any = [] ;
  another: any;
  image: any;
  model: any;
  constructor(
    public route: ActivatedRoute,
    public photoService: PhotoService
  ){

    
  }

  ngOnInit() {
    this.photoService.loadSaved();
    this.current = this.photoService.photos;
    this.another = this.current[0];
    this.image = this.another.data;
   
  }

  async predict() {
    
    //const img = document.getElementById('img');

    // Load the model.
    const model = await cocoSsd.load();
    // Classify the image.
    // const predictions = await model.detect(img);
    
    // console.log('Predictions: ');
    // console.log(predictions);
  }
  
}
