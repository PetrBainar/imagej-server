import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';

import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';
import { ModalDialogComponent } from './modal-dialog.component';

import { AppRoutingModule } from './app-routing.module';

import { ObjectService } from './object.service';
import { ModuleService } from './module.service';
import { MenuService } from './menu.service';
import { JsonService } from './json.service';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    ModalDialogComponent
  ],
  providers: [
    ModuleService,
    ObjectService,
    JsonService,
    MenuService,
    NotificationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
