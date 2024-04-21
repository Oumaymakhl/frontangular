import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document/document.component';
import { RouterModule } from '@angular/router';
import { DocumentRoutes } from './document/document.routing';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DocumentComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(DocumentRoutes),
    FormsModule
  ]
})
export class DocumentModule { }
