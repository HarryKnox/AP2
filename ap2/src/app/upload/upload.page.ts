import { Component, OnInit } from '@angular/core';
import { faRunning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  runIcon = faRunning;

  constructor() { }

  ngOnInit() {
  }

}
