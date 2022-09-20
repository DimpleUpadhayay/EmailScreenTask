import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',pathMatch:'full'
  },
  
  {
    path:'login',
    component:LoginComponent
  },
  
  {
    path: 'home',
    component:SidebarComponent,
    children:[
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./module/reports/reports.module').then(res => res.ReportsModule)
      }
    ]
  },
   
  {
    path:'**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
