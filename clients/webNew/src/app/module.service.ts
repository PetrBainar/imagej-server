import { Injectable, EventEmitter } from '@angular/core';

import { JsonService } from './json.service';

import { FijiModule } from './fiji-module';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';

@Injectable()
export class ModuleService {

  private modulesUrl = 'http://localhost:8080/modules';
  private availableModules: Array<FijiModule> = [];

  listUpdated: EventEmitter<Array<FijiModule>> = new EventEmitter();

  constructor(
    private jsonService: JsonService,
    private notificationService: NotificationService) {  }

  fetchModules(): void {
    this.availableModules = [];
    this.jsonService.getJsonData(this.modulesUrl)
      .subscribe((results: string[]) => {
        const component = this;
        results.forEach((result: string, iteration: number) => {
          component.availableModules.push(new FijiModule(iteration, result));
        });
        this.updateListeners();
      });
  }

  fetchModule(module: string): void {
    const service = this;
    this.jsonService.getJsonData(this.modulesUrl + '/' + module)
      .subscribe((details: Object) => {
        service.notificationService.moduleDetailsRetrieved(details);
      });
  }

  executeModule(moduleName: string, inputs: Object): Observable<Object> {
    return this.jsonService.postObject(`${this.modulesUrl}/${moduleName}`, inputs);
  }

  findImageRotationModule(): string {
    const imageRotationModule: FijiModule =
      this.availableModules.find((item: FijiModule) => (item.clazz === 'RotateImageXY'));
    return imageRotationModule.rawName;
  }

  private updateListeners(): void {
    this.listUpdated.emit(this.availableModules);
  }
}
