import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';

import { ModuleListComponent } from './module-list.component';
import { ObjectListComponent } from './object-list.component';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';

import { AppRoutingModule } from './app-routing.module';

import { ModuleService } from './module.service';
import { JsonService } from './json.service';
import { ObjectService } from './object.service';
import { MenuService } from './menu.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ModuleListComponent,
    ObjectListComponent,
    MenuComponent,
    MenuItemComponent
  ],
  providers: [
    ModuleService,
    ObjectService,
    JsonService,
    MenuService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
