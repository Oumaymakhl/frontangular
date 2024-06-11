

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { ParticipantService } from 'app/shared/API_service/participant.service';
import { Company } from 'app/shared/model/company';


@Component({
  selector: 'app-ajout-partcipant',
  templateUrl: './ajout-partcipant.component.html',
  styleUrls: ['./ajout-partcipant.component.css']
})
export class AjoutPartcipantComponent{
    participantForm: FormGroup;
    errors: any;
    passwordVisible: boolean = false;
    submitted: boolean = false;
    message: string | null = null;
    messageType: 'success' | 'danger' | null = null;
    companies: Company[] = [];

    constructor(private formBuilder: FormBuilder, private userService: ParticipantService) {}
  
    ngOnInit(): void {
      this.participantForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
        company_id: ['', Validators.required]
      });
      this.userService.getCompanies().subscribe(
        (res: any) => {
            this.companies = res.companies;
        },
        (err: any) => {
            console.error('Error fetching companies:', err);
        }
    );
    }
  
    saveParticipant() {
      this.submitted = true;

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
        this.message = 'User added successfully!';
        this.messageType = 'success';
        this.participantForm.reset();
        this.submitted = false;
      },
      (err: any) => {
        this.errors = err.error;
        console.log(err.error, 'errors');
        if (err.error.message === 'User already exists') {
          this.message = 'User already exists';
        } else if (err.error.message === 'Email or login already exists in other roles') {
          this.message = 'Email or login already exists in other roles';
        } else {
          this.message = 'Failed to add user. Please check the form and try again.';
        }
        this.messageType = 'danger';
      }
    );
  }
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible; 
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      if (this.passwordVisible) {
        passwordInput.type = 'text'; // Afficher le mot de passe
      } else {
        passwordInput.type = 'password'; // Masquer le mot de passe
      }
    
    
    }
    

  }