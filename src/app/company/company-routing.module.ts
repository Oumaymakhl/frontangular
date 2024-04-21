import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { ModifCompanyComponent } from './modif-company/modif-company.component';

const listcompany: Routes = [ {
  path: 'list',
  component:CompanyListComponent, 
},{
  path: 'list/modif/:id',
  component:ModifCompanyComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(listcompany)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
