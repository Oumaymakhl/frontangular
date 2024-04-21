import { Routes } from '@angular/router';

import { ReunionComponent } from './reunion/reunion.component';

export const ReunionRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: ReunionComponent
    }]
}];
