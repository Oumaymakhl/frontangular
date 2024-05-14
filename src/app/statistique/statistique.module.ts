import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatistiqueComponent } from './statistique/statistique.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StatistiqueRoutes } from './statistique.routing';



@NgModule({
  declarations: [
    StatistiqueComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StatistiqueRoutes),
    FormsModule
  ]
})
export class StatistiqueModule { }
