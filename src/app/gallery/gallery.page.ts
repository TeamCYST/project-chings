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
      let resultarray = result.split(', ');
      
      let messageres='';
      let i=0;
      while(i < resultarray.length){
        messageres=messageres+"<h3>"+resultarray[i]+"</h3>";
        //messageres=messageres+'<h3 style="text-transform:capitalize;">'+resultarray[i]+"</h3>";
        i++;
      }
      ;

     this.alertController.create(
      {
        header: 'Detection Result(s)',
        message: messageres,
        buttons: ['Dismiss'] 
      }
    ).then(alertC => alertC.present()); 

  }

}
