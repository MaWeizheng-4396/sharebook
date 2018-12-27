import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './@core/core.module';
import { DoEChartsModule } from './shared/do-echarts/do-echarts.module';
import { DoServiceModule } from './shared/do-service/do-service.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    DoEChartsModule,
    DoServiceModule,
    AppRoutingModule,
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule { }
