import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { PhotoService } from './../services/photo.service';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements AfterViewInit {
  
  @ViewChild("image", {static:false}) imgid: ElementRef;
 
  predicted:any = [];

  photo_array:any = [];
  current:any;
  _image:string = "./../../assets/image1.jpg";

 
  constructor(
    public photoService:PhotoService
  ){}
  

  ngAfterViewInit() {

    this.photoService.loadSaved();
    this.photo_array=this.photoService.photos;
    this.current = this.photo_array[0];
    this._image = this.current.data;

  }

  async predict(){
      
    const img = this.imgid.nativeElement;

    const model = await cocoSsd.load();
    console.log("model loaded");
    const predictions = await model.detect(img);
    console.log(predictions);
    this.predicted = predictions;
  }
 
}
