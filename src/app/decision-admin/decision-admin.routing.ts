import { Routes } from '@angular/router';

import { DecisionAdminComponent } from './decision-admin/decision-admin.component';

export const DecisionAdminRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component:  DecisionAdminComponent
    }]
}];
