import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meeting2Component } from './meeting2/meeting2.component';
import { RouterModule } from '@angular/router';
import { Meeting2Routes } from './meeting2.routing';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Meeting2Component
  ],
  imports: [
    CommonModule, RouterModule.forChild(Meeting2Routes),
    FormsModule
  ]
})
export class Meeting2Module { }
