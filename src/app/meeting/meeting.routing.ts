import { Routes } from '@angular/router';

import { MeetingComponent } from './meeting/meeting.component';

export const MeetingRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: MeetingComponent
    }]
}];
