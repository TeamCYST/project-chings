import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import * as cocoSsd from '@tensorflow-models/coco-ssd';


export interface Photo{
 data:any;
 result:any;
}
export class PhotoService {
  public photos: Photo[] = []; 
  public predictedPhotos: Photo[] = [];
  i: number;
  y: number;
  async loadModel(){
    const model = await cocoSsd.load();
    return model;
  }
 
  constructor(
    private camera: Camera,
    private file: File,
    private storage: Storage,
    private router: Router
  ) { }

  loadSaved(){
    this.storage.get('photos').then((photos) =>{
      this.photos = photos || [];
    })
  }

  predictedSaved(){
    this.storage.get('photos').then((photos) =>{
      this.photos = photos || [];
    });
    this.i=0;
    this.y=0;
      for (this.i=0;this.i<this.photos.length;this.i++){
        if (this.photos[this.i]['result'] !== ''){
          this.predictedPhotos[this.y] = this.photos[this.i];
          console.log(this.predictedPhotos[this.y]);
          this.y++;
        }
        this.i++;
        
      }
    
  }
  
  setResult(theResult){
    this.photos[0]['result'] = theResult;
    //console.log('setResult: '+this.photos[0]["result"]); 
  }

  go(){
    this.router.navigateByUrl('list');
  }


  cameraFnx(sourceType){
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
     };

     this.camera.getPicture(options).then((imageData)=>{
       this.photos.unshift({
         data: 'data:image/jpeg;base64,' + imageData,
         result: ''
       });
       this.storage.set('photos', this.photos);
       this.go();
     }, (err) => {
       console.log("Camera Issues: "+err);
     });
  }

  takePictures(){
    this.cameraFnx(this.camera.PictureSourceType.CAMERA);
  }

  pickImage(){
    this.cameraFnx(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  testSamples(image){
    this.photos.unshift({
      data: image,
      result: ''
    });
    this.storage.set('photos', this.photos);
    this.go();
  }
}

//    cc330018/n12328
