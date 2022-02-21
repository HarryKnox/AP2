import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileModalPageRoutingModule } from './edit-profile-modal-routing.module';

import { EditProfileModalPage } from './edit-profile-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileModalPageRoutingModule
  ],
  declarations: [EditProfileModalPage]
})
export class EditProfileModalPageModule {}
