
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DoServiceModule } from '../shared/do-service/do-service.module';
import { FormsModule } from '@angular/forms';
import { DoEChartsModule } from '../shared/do-echarts/do-echarts.module';

import { InterfaceMoudle } from '../pages/interface/interface.moudle';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../pages/auth-guard';
import { FilterPipe } from '.././filter.pipe';
import { ButtonModule } from 'primeng/components/button/button';

const PAGES_COMPONENTS = [
  PagesComponent,
  LoginComponent,
];

@NgModule({
  imports: [
    FormsModule,
    InterfaceMoudle,
    PagesRoutingModule,
    DoEChartsModule,
    ButtonModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS, FilterPipe,
  ],
  providers: [
    AuthGuard,
  ],
})
export class PagesModule {
}
