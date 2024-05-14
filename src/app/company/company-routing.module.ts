import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { ModifCompanyComponent } from './modif-company/modif-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { AuthGuard } from 'app/auth.guard';


const listcompany: Routes = [ {
  path: 'list',
  component:CompanyListComponent, 
},{
  path: 'list/modif/:id',
  component:ModifCompanyComponent,
},   { path: 'details/:id', 
component: CompanyDetailsComponent, 
}

];

@NgModule({
  imports: [RouterModule.forChild(listcompany)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
