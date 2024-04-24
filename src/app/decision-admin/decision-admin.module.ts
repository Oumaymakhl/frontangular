import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecisionAdminComponent } from './decision-admin/decision-admin.component';
import { RouterModule } from '@angular/router';
import { DecisionAdminRoutes } from './decision-admin.routing';
import { FormsModule } from '@angular/forms';
import { AjoutDecisionComponent } from './ajout-decision/ajout-decision.component';
import { ModifDecisionComponent } from './modif-decision/modif-decision.component';



@NgModule({
  declarations: [
    DecisionAdminComponent,
    AjoutDecisionComponent,
    ModifDecisionComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(DecisionAdminRoutes),
    FormsModule
  ]
})
export class DecisionAdminModule { }
