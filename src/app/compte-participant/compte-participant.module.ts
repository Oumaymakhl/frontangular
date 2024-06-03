import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeParticipantComponent } from './liste-participant/liste-participant.component';
import { AjoutPartcipantComponent } from './ajout-partcipant/ajout-partcipant.component';
import { ModifPartcipantComponent } from './modif-partcipant/modif-partcipant.component';
import { RouterModule } from '@angular/router';
import { FormRoutes } from 'app/form/form.routing';
import { TagInputModule } from 'ngx-chips';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from 'app/shared/API_service/admin.service';
import { AppComponent } from 'app/app.component';
import { ParticipantService } from 'app/shared/API_service/participant.service';
import { ComptePartcipantRoutingModule } from './compte-partcipant.routing';
import { CompanyService } from 'app/shared/API_service/company.service';


@NgModule({
  declarations: [
    ListeParticipantComponent,
    AjoutPartcipantComponent,
    ModifPartcipantComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormRoutes),
    FormsModule,
    TagInputModule,
    NgbModule,
    ReactiveFormsModule,HttpClientModule,ComptePartcipantRoutingModule
  ],
  providers: [AdminService,ParticipantService,ComptePartcipantRoutingModule,CompanyService], 
  bootstrap: [AppComponent]
})
export class CompteParticipantModule { }
