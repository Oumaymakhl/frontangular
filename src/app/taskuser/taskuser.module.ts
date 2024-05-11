import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskUserComponent } from './task-user/task-user.component';
import { RouterModule } from '@angular/router';
import { TaskUserRoutes } from './taskuser.routing';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TaskUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TaskUserRoutes),
    FormsModule,DragDropModule
  ],  exports: [TaskUserComponent]
})
export class TaskuserModule { }
