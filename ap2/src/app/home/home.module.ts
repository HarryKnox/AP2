import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { homePage } from './home.page';

import { homePageRoutingModule } from './home-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    homePageRoutingModule,
    NgCircleProgressModule,
  ],
  declarations: [homePage],
})
export class homePageModule {}
