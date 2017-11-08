import {Injectable, EventEmitter} from '@angular/core';

import { JsonService } from './json.service';

import { FijiModule } from './fiji-module';

@Injectable()
export class ModuleService {

  private modulesUrl = 'http://localhost:8080/modules';
  private availableModules: Array<FijiModule> = [];

  listUpdated: EventEmitter<Array<FijiModule>> = new EventEmitter();

  constructor(private jsonService: JsonService) {
    this.fetchModules();
  }

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

  private updateListeners(): void {
    this.listUpdated.emit(this.availableModules);
  }
}
