import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordRequestComponent } from './change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const authroutes: Routes = [ { path: 'change-password', 
component: ChangePasswordComponent },
{ path: 'reset', component: ChangePasswordRequestComponent },];

@NgModule({
  imports: [RouterModule.forChild(authroutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
