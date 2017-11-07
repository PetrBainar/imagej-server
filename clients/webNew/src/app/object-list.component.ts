import { Component, OnInit } from '@angular/core';

import { JsonService } from './json.service';
import { FijiObject } from './fiji-object';

@Component({
  selector: 'app-component-object-list',
  templateUrl: './object-list.component.html'
})

export class ObjectListComponent implements OnInit {

  private objectsUrl = 'http://localhost:8080/objects';

  timestamp: number;
  uploadedObjects: Array<FijiObject>;

  constructor(private jsonService: JsonService) {
    this.uploadedObjects = new Array<FijiObject>();
  }

  ngOnInit(): void {
    this.jsonService.getJsonData(this.objectsUrl)
      .subscribe(results => this.composeObjectInformation(results));

    this.timestamp = new Date().getTime();
  }

  composeObjectInformation(results: string[]) {
    const component = this;
    results.forEach((value: string, i: number) => {
      component.uploadedObjects.push(new FijiObject(this.objectsUrl, value, this.timestamp));
    });
  }
}
