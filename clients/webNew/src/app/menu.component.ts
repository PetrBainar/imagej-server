import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { ObjectService } from './object.service';
import { ModuleService } from './module.service';
import { MenuService } from './menu.service';
import { NotificationService } from './notification.service';

import { Subscription } from 'rxjs/Subscription';

import { FijiObject } from './fiji-object';
import { FijiModule } from './fiji-module';
import { FijiMenuItem } from './fiji-menu-item';

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
      this.objectService.listUpdated.subscribe(list => {
        this.uploadedObjects = list;
      }));
    this.subscriptions.push(
      this.moduleService.listUpdated.subscribe(list => {
        this.availableModules = list;
      }));
    this.subscriptions.push(
      this.menuService.menuUpdated.subscribe((menuRoot: FijiMenuItem) => {
        this.retrievedMenuRoot = menuRoot;
      }));
    this.subscriptions.push(
      this.notificationService.menuItemClickedNotification.subscribe( (menuItem: FijiMenuItem) => {
        this.executeCommand(menuItem.command);
      }));
    this.objectService.fetchObjects();
    this.moduleService.fetchModules();
    this.menuService.fetchMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  executeCommand(commandName: string) {
    const result: FijiModule = this.availableModules.find(module => module.rawName === 'command:' + commandName);

    if (result === null) {
      alert('No corresponding module found!');
      return;
    }

    if (this.activeObjectId === null) {
      alert('No object has been selected as active!');
    }

    if (result.rawName === this.moduleService.findImageRotationModule()) {
      const moduleInputs = {'context': null, 'dataset': this.activeObjectId, 'angle': 90, 'datasetService': null};
      this.moduleService.executeModule(result.rawName, moduleInputs)
        .subscribe(null, null, () => this.objectService.fetchObjects());
      return;
    }

    alert(result.rawName + ' module found, rendering not implmented yet!');
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
