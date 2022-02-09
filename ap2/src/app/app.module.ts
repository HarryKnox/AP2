import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { WebService } from './web.service';
import { DatePipe } from '@angular/common';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    AuthModule.forRoot({
      domain : "dev-7r2t6u-n.us.auth0.com",
      clientId : "9WhxIcb6LeMfyI4Ig7IprYXbbo7urZPV"
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },WebService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
