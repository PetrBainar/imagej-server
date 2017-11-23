import { Component, Input } from '@angular/core';
import { FijiMenuItem } from './fiji-menu-item';

@Component({
  selector: 'app-component-menu-item',
  styleUrls: ['./menu-item.component.css'],
  templateUrl: './menu-item.component.html'
})

export class MenuItemComponent {
  @Input()
  menuItem: FijiMenuItem;
}
