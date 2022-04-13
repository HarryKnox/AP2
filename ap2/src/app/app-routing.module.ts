import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'members',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profile-modal',
    loadChildren: () =>
      import('./edit-profile-modal/edit-profile-modal.module').then(
        (m) => m.EditProfileModalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./upload/upload.module').then((m) => m.UploadPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'data',
    loadChildren: () =>
      import('./data/data.module').then((m) => m.DataPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'help-modal',
    loadChildren: () =>
      import('./help-modal/help-modal.module').then(
        (m) => m.HelpModalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((m) => m.ShopPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'others-profile/:username',
    loadChildren: () =>
      import('./others-profile/others-profile.module').then(
        (m) => m.OthersProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'search-user-modal',
    loadChildren: () =>
      import('./search-user-modal/search-user-modal.module').then(
        (m) => m.SearchUserModalPageModule
      ),
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
