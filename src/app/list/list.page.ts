import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { PhotoService } from './../services/photo.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements AfterViewInit {
  
  @ViewChild("image", {static:false}) imgid: ElementRef;
 
  predicted:any = [];
  predictions = false;
  photo_array:any = [];
  current:any;
  _image:string = "./../../assets/image1.jpg";

 
  constructor(
    public photoService:PhotoService,
    public loadingController:LoadingController,
    public router:Router
  ){}
  

  ngAfterViewInit() {

    // this.photoService.loadSaved();
    // this.photo_array=this.photoService.photos;
    // this.current = this.photo_array[0];
    // this._image = this.current.data;

  }
  goBack(){
    this.router.navigateByUrl('home');
  }

  async predict(){
    const loading = await this.loadingController.create({
      message: 'Detecting objects...',
      duration: 20000
    });
    await loading.present();
    const img = this.imgid.nativeElement;
    
    const model = await cocoSsd.load();
    console.log("model loaded");
    loading.dismiss();
    const predictions = await model.detect(img);
    console.log(predictions);
    this.predictions = true;
    this.predicted = predictions;
  }
 
}
