import { Component, OnInit } from '@angular/core';

import { MenuService } from './menu.service';
import { NotificationService } from './notification.service';

import { FijiMenuItem } from './fiji-menu-item';

@Component({
  selector: 'app-component-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit {

  retrievedMenuRoot: FijiMenuItem;

  constructor(private menuService: MenuService, private notificationService: NotificationService) {
    this.menuService.menuUpdated.subscribe((menuRoot: FijiMenuItem) => {
      this.retrievedMenuRoot = menuRoot;
    });
    this.notificationService.menuItemClickedNotification.subscribe( (menuItem: FijiMenuItem) => {
      alert(menuItem.command + ' has been clicked');
    });
  }

  ngOnInit(): void {
    this.menuService.fetchMenu();
  }
}
