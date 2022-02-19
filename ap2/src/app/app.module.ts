import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebService } from './services/web.service';
import { DatePipe } from '@angular/common';

import { IonicStorageModule } from '@ionic/storage-angular';

import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule, IonicStorageModule.forRoot()
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WebService,DatePipe,
    {provide: HTTP_INTERCEPTORS,
      useClass:InterceptorService,
    multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
