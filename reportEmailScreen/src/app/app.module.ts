import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module'
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AlertService } from './services/alert.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ToastrModule} from 'ngx-toastr'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    SidebarComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [ApiService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
