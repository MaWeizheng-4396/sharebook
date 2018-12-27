import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoEChartsModule } from '../../shared/do-echarts/do-echarts.module';
import { DataTableModule, DialogModule, SharedModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/components/button/button';
import { InterfaceComponent } from './interface.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { LookCommentsComponent } from './look-comments/look-comments.component';
import { LookUploadComponent } from './look-upload/look-upload.component';
import { ReviewUploadComponent } from './review-upload/review-upload.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { TableModule } from 'primeng/primeng';

@NgModule({
  imports: [DoEChartsModule, FormsModule, ButtonModule, CommonModule, DataTableModule, SharedModule, DialogModule, Ng2SmartTableModule],
  declarations: [
    InterfaceComponent,
    AdminUpdateComponent,
    LookCommentsComponent,
    LookUploadComponent,
    ReviewUploadComponent,
  ],
})
export class InterfaceMoudle { }
