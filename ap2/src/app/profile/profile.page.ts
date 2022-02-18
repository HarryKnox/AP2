import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private auth : AuthService,
    private webService : WebService) { }



  ngOnInit() {
    
    this.webService.getUser().subscribe(
      res => (
        console.log(res)
      )
    )
  }

}
