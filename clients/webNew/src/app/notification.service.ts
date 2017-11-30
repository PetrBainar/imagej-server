import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FijiObject } from './fiji-object';
import { FijiModule } from './fiji-module';
import { FijiMenuItem } from './fiji-menu-item';

@Injectable()
export class NotificationService {
  constructor() {  }

  private retrievedObjects = new Subject<FijiObject[]>();
  public objectsRetrievedNotification = this.retrievedObjects.asObservable();

  private retrievedModules = new Subject<FijiModule[]>();
  public modulesRetrievedNotification = this.retrievedModules.asObservable();

  private retrievedModuleDetails = new Subject<Object>();
  public retrievedModuleDetailsNotification = this.retrievedModuleDetails.asObservable();

  private retrievedMenuRoot = new Subject<FijiMenuItem>();
  public menuRootRetrievedNotification = this.retrievedMenuRoot.asObservable();

  private clickedMenuItem = new Subject<FijiMenuItem>();
  public menuItemClickedNotification = this.clickedMenuItem.asObservable();

  private requestedModalDialog = new Subject<Object>();
  public modalDialogRequestedNotification = this.requestedModalDialog.asObservable();

  objectsRetrieved(objects: FijiObject[]) {
    this.retrievedObjects.next(objects);
  }

  modulesRetrieved(modules: FijiModule[]) {
    this.retrievedModules.next(modules);
  }

  moduleDetailsRetrieved(details: Object) {
    this.retrievedModuleDetails.next(details);
  }

  menuRootRetrieved(menuRoot: FijiMenuItem) {
    this.retrievedMenuRoot.next(menuRoot);
  }

  menuItemClicked(menuItem: FijiMenuItem) {
    this.clickedMenuItem.next(menuItem);
  }

  modalDialogRequested(dialog: Object) {
    this.requestedModalDialog.next(dialog);
  }
}
