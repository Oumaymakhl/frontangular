import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/shared/API_service/auth.service';
import { User } from 'app/shared/model/user';

@Component({
  moduleId: module.id,
  selector: 'user-cmp',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userProfile: User;
  selectedFile: File;
  message: string = '';
  messageType: string = '';

  @ViewChild('profilePictureInput') profilePictureInput: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().subscribe(
      (data) => {
        this.userProfile = data.profile;
        console.log(this.userProfile);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  selectProfilePicture() {
    this.profilePictureInput.nativeElement.click();
  }

  uploadProfilePicture(event: any) {
    this.selectedFile = event.target.files.item(0);
    if (this.selectedFile) {
      this.authService.uploadProfilePhoto(this.selectedFile).subscribe(
        (data) => {
          console.log('Photo uploaded successfully:', data);
          if (data.profile.profile_photo) {
            this.userProfile.profile_photo = data.profile.profile_photo;
          }
        },
        (error) => {
          console.error('Error uploading photo:', error);
        }
      );
    }
  }

  updateProfile() {
    const profileData = {
      nom: this.userProfile.nom,
      prenom: this.userProfile.prenom,
      login: this.userProfile.login,
      email: this.userProfile.email,
    };
      this.authService.updateProfile(profileData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.message = response.message; // Récupérer le message depuis la réponse
          this.messageType = 'success';
        },
        error: (error: any) => {
          console.error(error);
          this.message = error.error.message; // Récupérer le message d'erreur depuis l'erreur renvoyée
          this.messageType = 'danger';
        }
      });
    }
  }