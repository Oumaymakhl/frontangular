import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/API_service/auth.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errors = null;
  token: string;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {
    this.changePasswordForm = this.fb.group({
      email: [''],
      password: [''],
      password_confirmation: [''],
      passwordToken: [''],
    });

    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      this.changePasswordForm.controls['passwordToken'].setValue(
        this.token
      );
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.changePasswordForm.value.password !== this.changePasswordForm.value.password_confirmation) {
      this.errors = 'Passwords do not match';
    } else {
      this.errors = null;
      this.authService.resetPassword(this.changePasswordForm.value).subscribe(
        (result) => {
          // Mettre à jour la variable errors avec un message de succès
          this.errors = 'Password has been updated successfully.';
          // Réinitialiser le formulaire
          this.changePasswordForm.reset();
        },
        (error) => {
          // En cas d'erreur, appeler la fonction handleError pour afficher un message d'erreur
          this.handleError(error);
        }
      );
    }
  }

  handleError(error: any) {
    this.errors = 'An unexpected error occurred. Please try again later.';
  }
}