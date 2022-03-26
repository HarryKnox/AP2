import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPostModalPageRoutingModule } from './edit-post-modal-routing.module';
import { EditPostModalPage } from './edit-post-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPostModalPageRoutingModule,
  ],
  declarations: [EditPostModalPage],
})
export class EditPostModalPageModule {}
