import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleListComponent } from './module-list.component';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/modules', pathMatch: 'full' },
  { path: 'modules', component: ModuleListComponent},
  { path: 'menu', component: MenuComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
