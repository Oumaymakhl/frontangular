import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Statistique1Component } from './statistique1/statistique1.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Statistique1Routes } from './statistique1.routing';



@NgModule({
  declarations: [
    Statistique1Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(Statistique1Routes),
    FormsModule
  ]
})
export class Statistique1Module { }
