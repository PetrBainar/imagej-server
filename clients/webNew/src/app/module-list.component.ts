import { Component, OnInit } from '@angular/core';

import { ModuleService } from './module.service';

import { FijiModule } from './fiji-module';

@Component({
  selector: 'app-component-module-list',
  templateUrl: './module-list.component.html'
})

export class ModuleListComponent implements OnInit {

  availableModules: Array<FijiModule>;

  constructor(private moduleService: ModuleService) {
    this.moduleService.listUpdated.subscribe(list => {
      this.availableModules = list;
    });
  }

  ngOnInit(): void {
    this.moduleService.fetchModules();
  }
}
