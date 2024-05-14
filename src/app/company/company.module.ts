import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from 'app/shared/API_service/admin.service';
import { CompanyService } from 'app/shared/API_service/company.service';
import { AppComponent } from 'app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormRoutes } from 'app/form/form.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { ModifCompanyComponent } from './modif-company/modif-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { AuthGuard } from 'app/auth.guard';


@NgModule({
  declarations: [
    CompanyListComponent,
    ModifCompanyComponent,
    CompanyDetailsComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,ReactiveFormsModule,FormsModule,
 HttpClientModule,RouterModule.forChild(FormRoutes), NgbModule,  TagInputModule,
],
providers: [AdminService,CompanyService,CompanyRoutingModule,
  AuthGuard 
], 
bootstrap: [AppComponent]
})
export class CompanyModule { }
