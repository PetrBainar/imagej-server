import {Injectable, EventEmitter } from '@angular/core';

import { JsonService } from './json.service';

import { FijiObject } from './fiji-object';

@Injectable()
export class ObjectService {

  private objectsUrl = 'http://localhost:8080/objects';
  private objectsUrlUpload = 'http://localhost:8080/objects/upload';
  private uploadedObjects: Array<FijiObject> = [];
  private timestamp: number;

  listUpdated: EventEmitter<Array<FijiObject>> = new EventEmitter();

  constructor(private jsonService: JsonService) {  }

  uploadObject(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    this.jsonService.postFormData(this.objectsUrlUpload, formData)
      .subscribe(null, null, () => this.fetchObjects());
  }

  fetchObjects(): void {
    this.uploadedObjects = [];
    this.timestamp = new Date().getTime();
    this.jsonService.getJsonData(this.objectsUrl)
      .subscribe((results: string[]) => {
        const component = this;
        results.forEach((result: string) => {
          component.uploadedObjects.push(new FijiObject(component.objectsUrl, result, component.timestamp));
        });
        this.updateListeners();
      });
  }

  private updateListeners(): void {
    this.listUpdated.emit(this.uploadedObjects);
  }
}
