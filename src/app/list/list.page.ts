import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements AfterViewInit {
  @ViewChild("image", {static:false}) imgid: ElementRef;
 

  async ngAfterViewInit() {
    console.log(this.imgid.nativeElement);
    // const img = document.getElementById("img");
    const img = this.imgid.nativeElement;
    //const image = "";
    //const img = './../../assets/image1.jpg';
    const model = await cocoSsd.load();
    console.log("model loaded");
    const predictions = await model.detect(img);
    console.log(predictions);
  }

 
}
