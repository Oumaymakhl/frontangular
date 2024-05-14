import { Routes } from '@angular/router';

import { DocumentComponent } from './document.component';

export const DocumentRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: DocumentComponent
    }]
}];
