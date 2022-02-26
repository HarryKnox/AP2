import { Component, OnInit } from '@angular/core';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  // sets running icon from fortawesome import
  runIcon = faRunning;

  // exercise type icons border colour
  iconBorderColour = "0.01em solid black";


  constructor() { }

  ngOnInit() {
  }


  changeIconColour() {
    this.iconBorderColour = "0.15em solid green";
  }

}
