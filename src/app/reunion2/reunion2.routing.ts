import { Routes } from '@angular/router';

import { Reunion2Component } from './reunion2/reunion2.component';

export const Reunion2Routes: Routes = [{
    path: '',
    children: [{
        path: '',
        component:  Reunion2Component
    }]
}];
