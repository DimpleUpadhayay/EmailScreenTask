import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportEmailscreenComponent } from './report-emailscreen/report-emailscreen.component';
import { MaterialModule } from 'src/app/material.module';
import { DashboardComponent } from '../dashboard/dashboard.component';



@NgModule({
  declarations: [ReportEmailscreenComponent,DashboardComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,MaterialModule
  ]
})
export class ReportsModule { }
