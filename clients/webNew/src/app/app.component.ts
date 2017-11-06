import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
        <h1>{{title}}</h1>
        <app-component-json></app-component-json>
  `
})

export class AppComponent {
  title = 'Tour of Heroes';
}
