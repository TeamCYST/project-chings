import { Storage } from '@ionic/storage';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { PhotoService } from './../services/photo.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements AfterViewInit {
  
  @ViewChild("image", {static: true}) imgid: ElementRef<HTMLImageElement>;

 
  predicted:any = [];
  predictions = false;
  photo_array:any = [];
  current:any;
  _image:string = "./../../assets/image1.jpg";

  result:string = "";

  private ctx: CanvasRenderingContext2D;
  private loading;
  
  constructor(
    public photoService:PhotoService,
    public router:Router,
    private loadingCtrl:LoadingController,
    private storage:Storage
  ){}
  

  ngAfterViewInit() {
    this.photoService.loadSaved();
    this.photo_array=this.photoService.photos;
    this.current = this.photo_array[0];
    this._image = this.current.data;
  }

  async predict(){
    const img = this.imgid.nativeElement;
    console.log(img);
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 20000
    });
    await loading.present();
    const model = await cocoSsd.load();
    console.log("model loaded");
    await loading.dismiss();
    const predictions = await model.detect(img);
    console.log(predictions);
    this.predictions = true;
    this.predicted = predictions;

    this.result='';
    this.predicted.forEach(element => {
      this.result = this.result + element.class + ", ";
    });
    console.log(this.result);
    this.result = this.result.slice(0, -2);
    console.log(this.result);

    
  
    this.photoService.ProcessedPhotos.unshift({
      data: this._image,
      result: this.result,

    });
    this.storage.set('processedphotos', this.photoService.ProcessedPhotos);


    
  }
 
}
