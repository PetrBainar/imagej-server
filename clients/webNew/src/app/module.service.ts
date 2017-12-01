import { Injectable } from '@angular/core';

import { JsonService } from './json.service';
import { NotificationService } from './notification.service';

import { FijiModule } from './fiji-module';
import { FijiModuleDetails } from './fiji-module-details';
import { FijiModuleIO } from './fiji-module-io';

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

  async fetchModuleDetails(module: FijiModule): Promise<FijiModule> {
    const details: string[] = await this.jsonService.getJsonData(this.modulesUrl + '/' + module.rawName).toPromise();
    const inputs: FijiModuleIO[] = this.parseIO(details['inputs']);
    const outputs: FijiModuleIO[] = this.parseIO(details['outputs']);
    return module.addDetails(new FijiModuleDetails((module.id), inputs, outputs));
  }

  private parseIO(inputArray: Object[]): FijiModuleIO[] {
    const outputArray: FijiModuleIO[] = [];

    inputArray.forEach(i => {
      outputArray.push(new FijiModuleIO(i['name'], i['label'], i['genericType']));
    });

    return outputArray;
  }

  executeModule(moduleName: string, inputs: Object): Observable<Object> {
    return this.jsonService.postObject(`${this.modulesUrl}/${moduleName}`, inputs);
  }
}
