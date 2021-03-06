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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileModalPage } from './edit-profile-modal/edit-profile-modal.page';
import { ProfilePage } from './profile/profile.page';
import { SettingsPage } from './settings/settings.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { OthersProfilePage } from './others-profile/others-profile.page';

library.add(fas);

@NgModule({
  declarations: [AppComponent, EditProfileModalPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 65,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#992fed',
      innerStrokeColor: '#B394C6',
      animation: true,
      animationDuration: 300,
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    WebService,
    DatePipe,
    ProfilePage,
    SettingsPage,
    OthersProfilePage,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
