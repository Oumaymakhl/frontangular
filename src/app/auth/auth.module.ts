import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordRequestComponent } from './change-password-request/change-password-request.component';
import { FormModule } from 'app/form/form.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthService } from 'app/shared/API_service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormRoutes } from 'app/form/form.routing';


@NgModule({
  declarations: [
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormRoutes),
    FormsModule, ReactiveFormsModule,HttpClientModule,
  ],providers: [
    AuthService
]
})
export class AuthModule { }
