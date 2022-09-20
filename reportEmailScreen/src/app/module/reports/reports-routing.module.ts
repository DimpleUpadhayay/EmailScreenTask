import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportEmailscreenComponent } from './report-emailscreen/report-emailscreen.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component:DashboardComponent
  },
  {
    path: 'reports',
    component:ReportEmailscreenComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
