import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ObjectService } from './object.service';

import { FijiObject } from './fiji-object';
import { ModuleService } from './module.service';

@Component({
  selector: 'app-component-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})

export class ObjectListComponent implements OnInit {

  @ViewChild('fileInput') fileInputElementRef: ElementRef;
  uploadedObjects: Array<FijiObject>;

  constructor(private objectService: ObjectService, private moduleService: ModuleService) {
    this.objectService.listUpdated.subscribe(list => {
      this.uploadedObjects = list;
    });
  }

  ngOnInit(): void {
    this.objectService.fetchObjects();
  }

  uploadImage() {
    const files = this.fileInputElementRef.nativeElement['files'];
    if (files.length !== 1) {
      alert('Need exactly one file to upload!');
      return;
    }
    this.objectService.uploadObject(files[0]);
  }

  rotateImage(imageId: string) {
    const moduleInputs = {'context': null, 'dataset': imageId, 'angle': 90, 'datasetService': null};
    this.moduleService.executeModule(this.moduleService.findImageRotationModuleId(), moduleInputs)
      .subscribe(null, null, () => this.objectService.fetchObjects());
  }
}


