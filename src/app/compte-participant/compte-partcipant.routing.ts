import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeParticipantComponent } from './liste-participant/liste-participant.component';
import { AjoutPartcipantComponent } from './ajout-partcipant/ajout-partcipant.component';
import { ModifPartcipantComponent } from './modif-partcipant/modif-partcipant.component';
import { SupprimerPartcipantComponent } from './supprimer-partcipant/supprimer-partcipant.component';
const comptePartcipantRoutes: Routes = [
  {
    path: '',
    component: ListeParticipantComponent, // Redirection vers la liste des administrateurs
  },
  {
    path: 'modif/:id',
    component: ModifPartcipantComponent,
  },
  {
    path: 'ajout',
    component: AjoutPartcipantComponent,
  },
  {
    path: 'supprimer',
    component: SupprimerPartcipantComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(comptePartcipantRoutes),],
  exports: [RouterModule]
})
export class ComptePartcipantRoutingModule { }
