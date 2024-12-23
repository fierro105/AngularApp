import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EmployeesComponent } from './employees/employees.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesModalComponent } from './employees-modal/employees-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    EmployeesComponent,
    EmployeesModalComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, DataTablesModule, ReactiveFormsModule, FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
