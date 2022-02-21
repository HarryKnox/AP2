import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileModalPage } from './edit-profile-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileModalPageRoutingModule {}
