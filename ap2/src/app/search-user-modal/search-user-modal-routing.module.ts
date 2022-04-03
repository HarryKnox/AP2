import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchUserModalPage } from './search-user-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SearchUserModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchUserModalPageRoutingModule {}
