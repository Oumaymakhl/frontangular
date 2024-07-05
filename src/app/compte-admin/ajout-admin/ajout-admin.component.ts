import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'app/shared/API_service/admin.service';

@Component({
  selector: 'app-ajout-admin',
  templateUrl: './ajout-admin.component.html',
  styleUrls: ['./ajout-admin.component.css']
})
export class AjoutAdminComponent implements OnInit {
    signupForm: FormGroup;
    errors: any;
    submitted: boolean = false;
    passwordVisible: boolean = false;
    message: string | null = null;
    messageType: 'success' | 'danger' | null = null;
    selectedFile: File | null = null;
    selectedLogoUrl: string | null = null;

    selectedLogo: string | null = null; // Déclaration de la propriété selectedLogo
    constructor(private formBuilder: FormBuilder, private signupService: AdminService) {}
  
    ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        companyNom: ['', Validators.required],
        companySubdomaine: ['', Validators.required],
        companyLogo: ['', Validators.required],
        companyAdresse: ['', Validators.required]
      });
    }
    onLogoChange(event: any) {
      const file = (event.target as HTMLInputElement).files[0];
      this.signupForm.get('companyLogo')?.setValue(file);
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedLogoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  
    saveadmin() {
      this.submitted = true;
      
      if (this.signupForm.invalid) {
        return;
      }
      
      const formData = new FormData();
      formData.append('nom', this.signupForm.get('nom')?.value);
      formData.append('prenom', this.signupForm.get('prenom')?.value);
      formData.append('login', this.signupForm.get('login')?.value);
      formData.append('password', this.signupForm.get('password')?.value);
      formData.append('email', this.signupForm.get('email')?.value);
      formData.append('company[nom]', this.signupForm.get('companyNom')?.value);
      formData.append('company[subdomaine]', this.signupForm.get('companySubdomaine')?.value);
      formData.append('company[logo]', this.signupForm.get('companyLogo')?.value);
      formData.append('company[adresse]', this.signupForm.get('companyAdresse')?.value);
  
      this.signupService.saveadmin(formData).subscribe(
        (res: any) => {
          console.log(res, 'response');
          this.message = 'Admin and company added successfully!';
          this.messageType = 'success';
          this.signupForm.reset();
          this.selectedLogoUrl = res.imageUrl;
          this.submitted = false;

        },
        (err: any) => {
          this.errors = err.error.errors;
          console.log(err.error.errors, 'errors');
          if (err.error.error === 'Email already exists' || err.error.error === 'Company already exists') {
            this.message = err.error.error;
          } else {
            this.message = 'Failed to add admin. Please check the form and try again.';
          }
          this.messageType = 'danger';
        }
      );
    }
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible; 
    }
  }