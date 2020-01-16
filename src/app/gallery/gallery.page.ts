import { Component, OnInit } from '@angular/core';
import { PhotoService } from './../services/photo.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  constructor(private photoService: PhotoService, private alertController: AlertController) { }

  

  ngOnInit() {
    this.photoService.loadProcessed();
  }

  showResult(result: string) {
  
     this.alertController.create(
      {
        header: 'Object(s) Detected',
        message: result,
        buttons: ['Dismiss']
      }
    ).then(alertC => alertC.present()); 

  }

}
