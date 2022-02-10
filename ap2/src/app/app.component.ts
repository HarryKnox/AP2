import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public authService : AuthService,
    private router : Router) {}

  authenticated = false;

  ngOnInit(){
    console.log(this.router.url);
  }


  login(){
    this.authenticated = true;
  }



}// app component closed

