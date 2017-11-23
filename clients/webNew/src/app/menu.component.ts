import { Component, OnInit } from '@angular/core';

import { MenuService } from './menu.service';
import { FijiMenuItem } from './fiji-menu-item';

@Component({
  selector: 'app-component-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit {

  retrievedMenuRoot: FijiMenuItem;

  constructor(private menuService: MenuService) {
    this.menuService.menuUpdated.subscribe((menuRoot: FijiMenuItem) => {
      this.retrievedMenuRoot = menuRoot;
    });
  }

  ngOnInit(): void {
    this.menuService.fetchMenu();
  }
}
