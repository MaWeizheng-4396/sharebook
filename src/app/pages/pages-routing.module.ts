import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { LoginComponent } from '../pages/login/login.component';
import { InterfaceComponent } from '../pages/interface/interface.component';
import { AdminUpdateComponent } from '../pages/interface/admin-update/admin-update.component';
import { LookCommentsComponent } from '../pages/interface/look-comments/look-comments.component';
import { LookUploadComponent } from '../pages/interface/look-upload/look-upload.component';
import { ReviewUploadComponent } from '../pages/interface/review-upload/review-upload.component';

import { AuthGuard } from '../pages/auth-guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: PagesComponent,
    children: [{
      path: 'login',
      component: LoginComponent,
    },
      {
      path: 'interface',
      component: InterfaceComponent,
    }, {
      path: 'adminupdate',
      component: AdminUpdateComponent,
    }, {
      path: 'lookcomments',
      component: LookCommentsComponent,
    }, {
      path: 'lookupload',
      component: LookUploadComponent,
    }, {
      path: 'reviewupload',
      component: ReviewUploadComponent,
    }, {
      path: '',
      component: PagesComponent,
      pathMatch: 'full',
    }],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
