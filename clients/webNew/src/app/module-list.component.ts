import { Component, OnInit } from '@angular/core';

import { JsonService } from './json.service';
import { FijiModule } from './fiji-module';

@Component({
  selector: 'app-component-module-list',
  templateUrl: './module-list.component.html'
})

export class ModuleListComponent implements OnInit {

  private modulesUrl = 'http://localhost:8080/modules';

  availableModules: Array<FijiModule>;

  constructor(private jsonService: JsonService) {
    this.availableModules = new Array<FijiModule>();
  }

  ngOnInit(): void {
    this.jsonService.getJsonData(this.modulesUrl)
      .subscribe(results => this.composeModuleInformation(results));
  }

  composeModuleInformation(results: string[]) {
    const component = this;
    results.forEach((value: string, i: number) => {
      component.availableModules.push(new FijiModule(i, value));
    });
  }
}
