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
  message: string | null = null;
  messageType: 'success' | 'danger' | null = null;

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
        this.message = res.message;
        this.messageType = 'success';
      },
      error: (err: any) => {
        console.error(err);
        if (err.status === 404) {
          this.message = 'User not found';
        } else if (err.status === 422) {
          if (err.error.message === 'User already exists') {
            this.message = 'User already exists';
          } else if (err.error.message === 'Email or login already exists in other roles') {
            this.message = 'Email or login already exists in other roles';
          }
        } else {
          this.message = 'Failed to update participant. Please try again.';
        }
        this.messageType = 'danger';
      }
    });
  }
}