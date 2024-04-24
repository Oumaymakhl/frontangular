import { Routes } from '@angular/router';

import { DecisionComponent } from './decision/decision.component';

export const DecisionRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component:  DecisionComponent
    }]
}];
