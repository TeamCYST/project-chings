import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})

class Photo{
 data:any;
}
export class PhotoService {
  public photos: Photo[] = [];
  constructor(
    private camera: Camera,
    private file: File,
    private storage: Storage
  ) { }

  loadSaved(){
    this.storage.get('photos').then((photos) =>{
      this.photos = photos || [];
    })
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
         data: 'data:image/jpeg;base64,' + imageData
       });
       this.storage.set('photos', this.photos);
     }, (err) => {
       console.log("Camera Issues: "+err);
     });
  }

  takePictures(){
    this.cameraFnx(this.camera.PictureSourceType.CAMERA)
  }

  pickImage(){
    this.cameraFnx(this.camera.PictureSourceType.PHOTOLIBRARY)
  }
}
