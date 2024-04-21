
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'app/shared/API_service/admin.service';


@Component({
  selector: 'app-ajout-admin',
  templateUrl: './ajout-admin.component.html',
  styleUrls: ['./ajout-admin.component.css']
})

export class AjoutAdminComponent{
    signupForm: FormGroup;

    constructor(private fb: FormBuilder, private adminService: AdminService) {
        this.signupForm = this.fb.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            login: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            company: this.fb.group({
                nom: ['', Validators.required],
                adresse: ['', Validators.required],
                subdomaine: ['', Validators.required],
                logo: null,
            }),
        });
    }

    onSubmit() {
        if (this.signupForm.invalid) {
            return;
        }

        this.adminService.saveadmin(this.signupForm.value).subscribe(
            (response) => {
                console.log('Signup successful', response);
            },
            (error) => {
                console.error('Signup failed', error);
            }
        );
    }
}