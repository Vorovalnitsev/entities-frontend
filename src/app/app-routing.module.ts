import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './entities/entities.component';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';
const routes: Routes = [
  { path: 'entities', component: EntitiesComponent },
  { path: 'entity/:id', component: EntityDetailComponent },
  { path: '', redirectTo: '/entities', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
