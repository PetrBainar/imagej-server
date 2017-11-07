import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleListComponent } from './module-list.component';
import { ObjectListComponent } from './object-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/modules', pathMatch: 'full' },
  { path: 'modules', component: ModuleListComponent},
  { path: 'objects', component: ObjectListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
