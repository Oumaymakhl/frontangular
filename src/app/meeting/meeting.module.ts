import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from './meeting/meeting.component';
import { RouterModule } from '@angular/router';
import { MeetingRoutes } from './meeting.routing';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MeetingComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(MeetingRoutes),
    FormsModule
  ]
})
export class MeetingModule { }
