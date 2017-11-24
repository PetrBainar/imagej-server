import { Component, OnInit, OnDestroy } from '@angular/core';

import { MenuService } from './menu.service';
import { NotificationService } from './notification.service';

import { Subscription } from 'rxjs/Subscription';

import { FijiMenuItem } from './fiji-menu-item';

@Component({
  selector: 'app-component-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  retrievedMenuRoot: FijiMenuItem;

  constructor(
    private menuService: MenuService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.menuService.menuUpdated.subscribe((menuRoot: FijiMenuItem) => {
        this.retrievedMenuRoot = menuRoot;
      }));
    this.subscriptions.push(
      this.notificationService.menuItemClickedNotification.subscribe( (menuItem: FijiMenuItem) => {
        alert(menuItem.command + ' has been clicked');
      }));
    this.menuService.fetchMenu();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
