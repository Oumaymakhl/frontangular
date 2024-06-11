
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from 'app/shared/API_service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'app/shared/API_service/token.service';
import { AuthStateService } from 'app/shared/API_service/auth-state.service';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    loginForm: FormGroup;
    errors: any = null;
    focus: boolean;
    focus1: boolean;
    focus2: boolean;
    private sidebarVisible: boolean;
  
    constructor(
        public router: Router,
        public fb: FormBuilder,
        public authService: AuthService,
        private token: TokenService,
        private authState: AuthStateService,
        
        private element: ElementRef
      )  {
      this.loginForm = this.fb.group({
        login: ['', Validators.required], 
        password: ['', Validators.required], 
      });
    }
    
    ngOnInit() {
      this.checkFullPageBackgroundImage();
      document.body.classList.add('login-page');
    }
  
    ngOnDestroy() {
      document.body.classList.remove('login-page');
    }
  
    onSubmit() {
      this.authService.login(this.loginForm.value).subscribe(
        (result) => {
          this.responseHandler(result);
        },
        (error) => {
          this.errors = error.error;
        },
        () => {
          this.authState.setAuthState(true);
          this.loginForm.reset();
        }
      );
    }
    responseHandler(data: any) {
      this.token.handle(data.token);
      const userType = data.type;
      switch (userType) {
        case 'admin':
          this.router.navigate(['/statistique']);
          break;
        case 'superadmin':
          this.router.navigate(['/statistique1']);
          break;
        case 'user':
          this.router.navigate(['/reunion']);
          break;
        default:
          this.router.navigate(['/']);
          break;
      }
    }
    // Method to check full page background image
    checkFullPageBackgroundImage() {
      const $page = document.querySelector('.full-page');
      const image_src = $page ? $page.getAttribute('data-image') : null;
  
      if (image_src) {
        const image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
        $page.insertAdjacentHTML('beforeend', image_container);
      }
    }
  
    // Method to toggle sidebar
    sidebarToggle() {
      const body = document.getElementsByTagName('body')[0];
      const sidebar = document.getElementsByClassName('navbar-collapse')[0];
      const toggleButton = document.querySelector('.navbar-toggler');
  
      if (!this.sidebarVisible) {
        setTimeout(() => {
          toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
      } else {
        toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
      }
    }
  }
  