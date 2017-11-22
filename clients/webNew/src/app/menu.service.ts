import { Injectable, EventEmitter } from '@angular/core';

import { JsonService } from './json.service';
import { FijiMenuItem } from './fiji-menu-item';

@Injectable()
export class MenuService {

  private menuUrl = 'http://localhost:8080/admin/menuNew';
  private retrievedMenuRoot: FijiMenuItem;

  menuUpdated: EventEmitter<FijiMenuItem> = new EventEmitter();

  constructor(private jsonService: JsonService) {  }

  fetchMenu(): void {
    const component = this;
    this.jsonService.getJsonData(this.menuUrl)
      .subscribe((results: Object) => {
        component.retrievedMenuRoot = component.extractMenu(results);
      this.updateListeners();
    });
  }

  private extractMenu(menuItemCandidate: Object): FijiMenuItem {
    const menuItem: FijiMenuItem = new FijiMenuItem(menuItemCandidate['Level'], menuItemCandidate['Label']);
    for (const key of Object.keys(menuItemCandidate).filter(prop => prop !== 'Level' && prop !== 'Label' && prop !== 'Command')) {
      menuItem.AddChild(this.extractMenu(menuItemCandidate[key]));
    }
    return menuItem;
  }

  private updateListeners(): void {
    this.menuUpdated.emit(this.retrievedMenuRoot);
  }
}
