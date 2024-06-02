import { Routes } from '@angular/router';

import { FullScreenMapsComponent } from './fullscreenmap/fullscreenmap.component';

export const MapsRoutes: Routes = [{
        path: '',
        children: [{
            path: 'fullscreen',
            component: FullScreenMapsComponent
        }]
    },
];
