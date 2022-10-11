import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportEmailscreenComponent } from './report-emailscreen/report-emailscreen.component';
import { MaterialModule } from 'src/app/material.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SearchReportPipe } from 'src/app/shared/search-report.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReportEmailscreenComponent,DashboardComponent,SearchReportPipe],
  imports: [
    CommonModule,
    ReportsRoutingModule,MaterialModule,
    FormsModule
    
  ]
})
export class ReportsModule { }
