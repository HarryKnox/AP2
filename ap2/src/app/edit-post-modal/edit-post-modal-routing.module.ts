import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPostModalPage } from './edit-post-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditPostModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPostModalPageRoutingModule {}
