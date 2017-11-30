import { Injectable } from '@angular/core';

import { JsonService } from './json.service';
import { NotificationService } from './notification.service';

import { FijiModule } from './fiji-module';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModuleService {

  private modulesUrl = 'http://localhost:8080/modules';

  constructor(
    private jsonService: JsonService,
    private notificationService: NotificationService) {  }

  fetchModules(): void {
    const availableModules: FijiModule[] = [];
    this.jsonService.getJsonData(this.modulesUrl)
      .subscribe((results: string[]) => {
        const service = this;
        results.forEach((result: string, iteration: number) => {
          availableModules.push(new FijiModule(iteration, result));
        });
        service.notificationService.modulesRetrieved(availableModules);
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
}
