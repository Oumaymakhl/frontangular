import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParticipantService } from 'app/shared/API_service/participant.service';

@Component({
  selector: 'app-modif-partcipant',
  templateUrl: './modif-partcipant.component.html',
  styleUrls: ['./modif-partcipant.component.css']
})
export class ModifPartcipantComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute, 
    private participantservice: ParticipantService
  ) {}
  
  participant: any = {}; 
  participantId: any;
  loading: boolean = true;

  ngOnInit() {
    this.participantId = this.route.snapshot.paramMap.get('id');
    this.participantservice.getParticipant(this.participantId).subscribe(
      (res:any) => {
        console.log(res); 
        this.participant = res.user; 
        this.loading = false;
      }
    );
  }

  updateParticipant() {
    var inputData = {
      nom: this.participant.nom,
      prenom: this.participant.prenom,
      login: this.participant.login,
      email: this.participant.email,
      company_id: this.participant.company_id,
    };

    this.participantservice.updateparticipant(inputData, this.participantId).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
      }
    });
  }
}
