import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reunion2Component } from './reunion2/reunion2.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Reunion2Routes } from './reunion2.routing';



@NgModule({
  declarations: [
    Reunion2Component
  ],
  imports: [
    CommonModule, RouterModule.forChild(Reunion2Routes),
    FormsModule
  ]
})
export class Reunion2Module { }
