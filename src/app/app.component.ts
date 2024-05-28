import { Component, OnInit } from '@angular/core';
import { AuthStateService } from './shared/API_service/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from './shared/API_service/token.service';
import { BehaviorSubject, Observable } from 'rxjs'; // Import de BehaviorSubject

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isSignedIn!: boolean;
  token$: Observable<string | null>;

  constructor(
    private auth: AuthStateService,
    private tokenService: TokenService,
    public router: Router
  ) {}

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });

    this.token$ = this.tokenService.tokenChange$;
    this.token$.subscribe(token => {
      this.isSignedIn = this.tokenService.loggedIn();
    });
  }

  signOut() {
    this.auth.setAuthState(false);
    this.tokenService.remove();
    this.router.navigate(['login']);
  }
  
}