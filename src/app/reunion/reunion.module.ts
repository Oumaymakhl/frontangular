import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReunionComponent } from './reunion/reunion.component';
import { ReunionRoutes } from './reunion.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReunionComponent,
 
    ],
  imports: [
    CommonModule, RouterModule.forChild(ReunionRoutes),
    FormsModule
  ]
})
export class ReunionModule { }
