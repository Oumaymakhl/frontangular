import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecisionComponent } from './decision/decision.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DecisionRoutes } from './decision.routing';



@NgModule({
  declarations: [
    DecisionComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(DecisionRoutes),
    FormsModule
  ]
})
export class DecisionModule { }
