import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FijiMenuItem } from './fiji-menu-item';

@Injectable()
export class NotificationService {
  constructor() {  }

  private clickedMenuItem = new Subject<FijiMenuItem>();
  public menuItemClickedNotification = this.clickedMenuItem.asObservable();

  menuItemClicked(menuItem: FijiMenuItem) {
    this.clickedMenuItem.next(menuItem);
  }
}
