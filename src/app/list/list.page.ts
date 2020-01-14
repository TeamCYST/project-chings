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
  @ViewChild("canvas", {static: true}) canvas: ElementRef<HTMLCanvasElement>;
 
  predicted:any = [];
  predictions = false;
  photo_array:any = [];
  current:any;
  _image:string = "./../../assets/image1.jpg";
  w_diff:number;
  h_diff:number;
  result:string = "";

  private ctx: CanvasRenderingContext2D;
  private loading;
  
  constructor(
    public photoService:PhotoService,
    public router:Router,
    private loadingCtrl:LoadingController
  ){}
  

  ngAfterViewInit() {
    

    const img = this.imgid.nativeElement;
    const canvas = this.canvas.nativeElement;
    this.ctx = this.canvas.nativeElement.getContext('2d');
     
    setTimeout(e => this.ctx.drawImage(img, 0, 0, img.width, img.height,   0, 0, canvas.width, canvas.height), 500);
    this.photoService.loadSaved();
    this.photo_array=this.photoService.photos;
    this.current = this.photo_array[0];
    this._image = this.current.data;
    
    
  }
  goBack(){
    this.router.navigateByUrl('home');
  }

  async predict(){
    const img = this.imgid.nativeElement;
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
    /* this.predicted.forEach(element => {
      this.draw(Math.round(element.bbox[0]), Math.round(element.bbox[1]), Math.round(element.bbox[2]), Math.round(element.bbox[3]), 'red', element.class);
      //console.log(element.bbox[0])
    }); */

    this.predicted.forEach(element => {
      this.result = this.result + element.class + ", ";
    });
    console.log(this.result);
    this.result = this.result.slice(0, -2);
    console.log(this.result);

    this.photoService.setResult(this.result);
    
  }
 


  draw(x:number, y:number, width:number, height:number, color:string, className:string){
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.fillText(className, x, y);
    this.ctx.scale(.75, .85);
    this.ctx.strokeRect(x, y, width, height);
  }
}
