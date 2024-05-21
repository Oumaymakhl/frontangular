import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/API_service/auth.service';
import { TokenService } from 'app/shared/API_service/token.service';
import { User } from 'app/shared/model/user';

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{ 
  userProfile: User;
  selectedFile: File;

  @ViewChild('profilePictureInput') profilePictureInput: ElementRef;

  constructor(private authService: AuthService) { }

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
    this.selectedFile = event.target.files.item(0); // Utiliser item(0) au lieu de [0]
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
        alert(response.message); // Afficher un message de succès à l'utilisateur
      },
      error: (error: any) => {
        console.error('Error updating profile', error);
        
      }
    });
  }}