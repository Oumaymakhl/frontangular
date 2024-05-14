import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
 constructor(public token: TokenService) {}
  private userState = new BehaviorSubject<boolean>(this.token.loggedIn()!);
  userAuthState = this.userState.asObservable();
  
  setAuthState(value: boolean) {
    this.userState.next(value);
  }
  getCurrentUser() {
    return this.token.decodePayload(this.token.get());
  }
}

  
 