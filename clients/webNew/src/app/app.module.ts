import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ModuleListComponent } from './module-list.component';
import { ObjectListComponent } from './object-list.component';

import { AppRoutingModule } from './app-routing.module';

import { JsonService } from './json.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ModuleListComponent,
    ObjectListComponent
  ],
  providers: [
    JsonService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
