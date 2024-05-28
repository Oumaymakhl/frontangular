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
  showCompanyFields: boolean = false; // Ajout de la variable pour contrôler la visibilité des champs d'entreprise

  constructor(private formBuilder: FormBuilder, private signupService: AdminService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      login: [''],
      password: [''],
      email: [''],
      companyNom: [''],
      companySubdomaine: [''],
      companyLogo: [''],
      companyAdresse: ['']
    });
  }

  onLogoChange(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.get('companyLogo')?.setValue(file);
  }

  // Fonction pour gérer le changement de sélection de l'entreprise
  onCompanySelectionChange(event: any) {
    // Vérifiez si une entreprise est sélectionnée
    if (event.target.value !== '') {
      this.showCompanyFields = true; // Afficher les champs d'entreprise
    } else {
      this.showCompanyFields = false; // Cacher les champs d'entreprise
    }
  }

  saveadmin() {
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
        alert(res.message); // Message ici est juste pour la démonstration, idéalement, vous le remplaceriez par un message d'interface utilisateur approprié
      },
      (err: any) => {
        this.errors = err.error.errors;
        console.log(err.error.errors, 'errors');
      }
    );
  }
}