import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

class Photo {
  data: any;
}
export class PhotoService {
  current: any = './../../assets/18353.jpg';
  public photos: Photo[] = [];
  constructor(
    private camera: Camera,
    private file: File,
    private storage: Storage,
    public router: Router
  ) { }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    })
  }

  go() {

    this.router.navigateByUrl('list');
  }

  cameraFnx(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.current = 'data:image/jpeg;base64,' + imageData;
      this.photos.unshift({
        data: this.current
      });
      this.storage.set('photos', this.photos);

      this.go();

    }, (err) => {
      console.log('Camera Issues: ' + err);
    });
  }

  takePictures() {
    this.cameraFnx(this.camera.PictureSourceType.CAMERA);

  }

  pickImage() {
    this.cameraFnx(this.camera.PictureSourceType.PHOTOLIBRARY);
  }
}
