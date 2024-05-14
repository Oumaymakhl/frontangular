import { Component, OnInit } from '@angular/core';
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
  
  }