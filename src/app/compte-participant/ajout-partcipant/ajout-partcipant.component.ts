

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { ParticipantService } from 'app/shared/API_service/participant.service';


@Component({
  selector: 'app-ajout-partcipant',
  templateUrl: './ajout-partcipant.component.html',
  styleUrls: ['./ajout-partcipant.component.css']
})
export class AjoutPartcipantComponent{
    participantForm: FormGroup;
    errors: any;
  
    constructor(private formBuilder: FormBuilder, private userService: ParticipantService) {}
  
    ngOnInit(): void {
      this.participantForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        company_id: ['', Validators.required]
      });
    }
  
    saveParticipant() {
      if (this.participantForm.invalid) {
        return;
      }
      
      const inputData = new FormData();
      inputData.append('nom', this.participantForm.get('nom')?.value);
      inputData.append('prenom', this.participantForm.get('prenom')?.value);
      inputData.append('login', this.participantForm.get('login')?.value);
      inputData.append('password', this.participantForm.get('password')?.value);
      inputData.append('email', this.participantForm.get('email')?.value);
      inputData.append('company_id', this.participantForm.get('company_id')?.value);
  
      this.userService.saveparticipant(inputData).subscribe(
        (res: any) => {
          console.log(res, 'response');
          alert(res.message);
        },
        (err: any) => {
          this.errors = err.error.message;
          console.log(err.error.message, 'error');
        }
      );
    }
  }