import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/shared/API_service/auth.service';
import { AppComponent } from 'app/app.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        ReactiveFormsModule,HttpClientModule,FormsModule,

    ],providers: [AuthService], 
    bootstrap: [AppComponent],
    declarations: [UserComponent]
})

export class UserModule {}
