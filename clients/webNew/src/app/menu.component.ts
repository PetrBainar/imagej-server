import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { ObjectService } from './object.service';
import { ModuleService } from './module.service';
import { MenuService } from './menu.service';
import { NotificationService } from './notification.service';

import { Subscription } from 'rxjs/Subscription';

import { FijiObject } from './fiji-object';
import { FijiModule } from './fiji-module';
import { FijiMenuItem } from './fiji-menu-item';
import { FijiDialog } from './fiji-dialog';
import { FijiModuleIO } from './fiji-module-io';

@Component({
  selector: 'app-component-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  retrievedMenuRoot: FijiMenuItem;

  @ViewChild('fileInput') fileInputElementRef: ElementRef;
  uploadedObjects: FijiObject[];
  activeObjectId: string = null;

  availableModules: FijiModule[];

  constructor(
    private objectService: ObjectService,
    private moduleService: ModuleService,
    private menuService: MenuService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.notificationService.objectsRetrievedNotification.subscribe(list => {
        this.uploadedObjects = list;
      }));
    this.subscriptions.push(
      this.notificationService.modulesRetrievedNotification.subscribe(list => {
        this.availableModules = list;
      }));
    this.subscriptions.push(
      this.notificationService.menuRootRetrievedNotification.subscribe((menuRoot: FijiMenuItem) => {
        this.retrievedMenuRoot = menuRoot;
      }));
    this.subscriptions.push(
      this.notificationService.menuItemClickedNotification.subscribe( (menuItem: FijiMenuItem) => {
        this.handleMenuSelection(menuItem);
      }));
    this.objectService.fetchObjects();
    this.moduleService.fetchModules();
    this.menuService.fetchMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  async handleMenuSelection(menuItem: FijiMenuItem) {
    const module: FijiModule = this.availableModules.find(m => m.rawName === 'command:' + menuItem.command);

    if (module === null) {
      alert('No corresponding module found!');
      return;
    }

    if (this.activeObjectId === null) {
      alert('No object has been selected as active!');
      return;
    }

    const detailedModule = await this.moduleService.fetchModuleDetails(module);

    if (!detailedModule.hasDetails()) {
      alert('Module details are not available!');
    }

    const header = module.clazz;
    const body = this.composeModuleInputs(module.details.inputs);

    this.notificationService.modalDialogRequested(new FijiDialog(header, body, 'Ahoj'));
  }

  private composeModuleInputs(inputs: FijiModuleIO[]): string {
    let formattedElements = '';
    inputs.forEach(i => {
      switch (i.genericType) {
        default:
          formattedElements += this.addUnresolvedType(i);
      }
    });
    return formattedElements;
  }

  private addUnresolvedType(inputParameter: FijiModuleIO): string {
    return '<h2>' + inputParameter.name + '</h2>';
  }

  uploadImage() {
    const files = this.fileInputElementRef.nativeElement['files'];
    if (files.length !== 1) {
      alert('Need exactly one file to upload!');
      return;
    }
    this.objectService.uploadObject(files[0]);
  }

  setObjectActive(imageId: string) {
    this.activeObjectId = imageId;
  }
}
