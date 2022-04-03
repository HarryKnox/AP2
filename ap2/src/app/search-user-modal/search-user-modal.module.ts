import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchUserModalPageRoutingModule } from './search-user-modal-routing.module';

import { SearchUserModalPage } from './search-user-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchUserModalPageRoutingModule
  ],
  declarations: [SearchUserModalPage]
})
export class SearchUserModalPageModule {}
