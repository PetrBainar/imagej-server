import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';

import { JsonService } from './json.service';
import { FijiObject } from './fiji-object';

@Component({
  selector: 'app-component-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})

export class ObjectListComponent implements OnInit {

  @ViewChild('fileInput') fileInputElementRef: ElementRef;

  private objectsUrl = 'http://localhost:8080/objects';
  private objectsUrlUpload = 'http://localhost:8080/objects/upload';

  timestamp: number;
  uploadedObjects: Array<FijiObject>;

  constructor(private jsonService: JsonService) {
    this.uploadedObjects = [];
  }

  ngOnInit(): void {
    this.retrieveObjects();
  }

  retrieveObjects(): void {
    this.uploadedObjects = [];
    this.jsonService.getJsonData(this.objectsUrl)
      .subscribe((results: string[]) => {
        const component = this;
        component.timestamp = new Date().getTime();
        results.forEach((result: string) => {
          component.uploadedObjects.push(new FijiObject(this.objectsUrl, result, this.timestamp));
        });
      });
  }

  uploadImage() {
    const files = this.fileInputElementRef.nativeElement['files'];

    if (files.length !== 1) {
      alert('Need exactly one file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    this.jsonService.postFormData(this.objectsUrlUpload, formData)
      .subscribe(null, null, () => this.retrieveObjects());
  }
}
