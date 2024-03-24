import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeAdminComponent } from './liste-admin/liste-admin.component';
import { ModifAdminComponent } from './modif-admin/modif-admin.component';
import { AjoutAdminComponent } from './ajout-admin/ajout-admin.component';
import { SupprimerAdminComponent } from './supprimer-admin/supprimer-admin.component';

const compteAdminRoutes: Routes = [
  {
    path: '',
    component: ListeAdminComponent, // Redirection vers la liste des administrateurs
  },
  {
    path: 'modif',
    component: ModifAdminComponent,
  },
  {
    path: 'ajout',
    component: AjoutAdminComponent,
  },
  {
    path: 'supprimer',
    component: SupprimerAdminComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(compteAdminRoutes)],
  exports: [RouterModule]
})
export class CompteAdminRoutingModule { }
