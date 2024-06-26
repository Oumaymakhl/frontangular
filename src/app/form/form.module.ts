import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from './equal-validator.directive';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

import { FormRoutes } from './form.routing';

import { ExtendedFormsComponent } from './extendedforms/extendedforms.component';
import { RegularFormsComponent } from './regularforms/regularforms.component';
import { ValidationFormsComponent } from './validationforms/validationforms.component';
import { WizardComponent } from './wizard/wizard.component';


@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(FormRoutes),
        FormsModule,
        TagInputModule,
        JwBootstrapSwitchNg2Module,
        NgbModule
    ],
    declarations: [
        RegularFormsComponent,
        ValidationFormsComponent,
        WizardComponent,
        EqualValidator
    ]
})

export class FormModule { }
