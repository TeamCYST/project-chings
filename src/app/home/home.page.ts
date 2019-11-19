import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentImage:any ="./../../assets/18353.jpg";

  constructor(private camera: Camera) {}

  takePictures(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
     };

     this.camera.getPicture(options).then((imageData)=>{
       this.currentImage = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
       console.log("Camera Issues: "+err);
     });
  }

}
