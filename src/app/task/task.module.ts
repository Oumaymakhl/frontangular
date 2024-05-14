import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskRoutes } from './task.routing';



@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TaskRoutes),
    FormsModule
  ],  exports: [TaskComponent] // Exportez TaskComponent
})
export class TaskModule { }

