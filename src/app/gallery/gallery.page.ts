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
     
      let messages='';
      let i=0;
      while(i < result.length){
        messages=messages+"<h3>"+result[i]+"</h3>";
        //messages=messages+'<h3 style="text-transform:capitalize;">'+result[i]+"</h3>";
        i++;
      }
      ;

     this.alertController.create(
      {
        header: 'Detection Result(s)',
        message: messages,
        buttons: ['Dismiss'] 
      }
    ).then(alertC => alertC.present()); 

  }

}
