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

  @ViewChild('image', { static: true }) imgid: ElementRef<HTMLImageElement>;


  predicted: any = [];
  predictions = false;
  photoArray: any = [];
  uniqueCount: any = [];
  storedresults: any = [];
  current: any;
  _image  = './../../assets/image1.jpg';

  result = '';

  private ctx: CanvasRenderingContext2D;
  private loading;

  constructor(
    public photoService: PhotoService,
    public router: Router,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) { }


  ngAfterViewInit() {
    this.photoService.loadSaved();
    this.photoArray = this.photoService.photos;
    this.current = this.photoArray[0];
    this._image = this.current.data;
  }

  async predict() {
    const img = this.imgid.nativeElement;
    console.log(img);
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 20000
    });
    await loading.present();
    const model = await cocoSsd.load();
    console.log('model loaded');
    await loading.dismiss();
    const predictions = await model.detect(img);
    console.log(predictions);
    this.predictions = true;
    this.predicted = predictions;

    let i = 0;
    this.predicted.forEach(element => {
      this.uniqueCount[i] = element.class;
      i++;
    });
    // console.log('UniqueCount: '+this.uniqueCount);
    // this.result = this.result.slice(0, -2);
    //  console.log('predicted :'+this.predict);

    const count = [];
    this.uniqueCount.forEach((e) => { count[e] = (count[e] || 0) + 1; });

    const keysarray = Object.keys(count);
    i = 0;
    keysarray.forEach(element => {
      this.storedresults[i] = element + '(s) : ' + count[element];
      i++;
    });

    console.log(this.storedresults);

    this.photoService.ProcessedPhotos.unshift({
      data: this._image,
      result: this.storedresults,

    });
    this.storage.set('processedphotos', this.photoService.ProcessedPhotos);



  }

}
