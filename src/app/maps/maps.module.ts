import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NguiMapModule} from '@ngui/map';

import { MapsRoutes } from './maps.routing';

import { FullScreenMapsComponent } from './fullscreenmap/fullscreenmap.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MapsRoutes),
        FormsModule,
        NguiMapModule.forRoot()
    ],
    declarations: [
        FullScreenMapsComponent,
   
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MapsModule {}
