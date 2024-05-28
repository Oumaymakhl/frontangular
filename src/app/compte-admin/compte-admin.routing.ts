import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import { ModifAdminComponent } from './modif-admin/modif-admin.component';
import { AjoutAdminComponent } from './ajout-admin/ajout-admin.component';

const compteAdminRoutes: Routes = [
  {
    path: '',
    component: ListeAdminComponent, // Redirection vers la liste des administrateurs
  },
  {
    path: 'modif/:id',
    component: ModifAdminComponent,
  },
  {
    path: 'ajout',
    component: AjoutAdminComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(compteAdminRoutes)],
  exports: [RouterModule]
})
export class CompteAdminRoutingModule { }
