import { Routes } from '@angular/router';

import { Meeting2Component } from './meeting2/meeting2.component';

export const Meeting2Routes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: Meeting2Component
    }]
}];
