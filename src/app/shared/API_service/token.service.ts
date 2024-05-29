import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
/*
 handle(token:any){
    this.set(token);
  }*/

 /* set(token:any){
    return localStorage.setItem('token',token);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    return localStorage.removeItem('token');
  }

  /*isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return (payload.iss==="http://localhost:8000/api/admin/login")?true:false;
      }
    }
    return false;
  }*/
  /*isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return (payload.iss === "http://localhost:8000/api/admin/login" && payload.company_id)? true : false;
      }
    }
    return false;
  }

payload(token:any){
    const payload = token.split('.')[1];
    return payload;
    
  }


  loggedIn(){
    const token = this.get();
    console.log("Token from local storage:", token);
    if(token){
      const payload = this.payload(token);
      console.log("Token payload:", payload);
      if(payload && payload.company_id){
        return (payload.iss === "http://localhost:8000/api/admin/login") ? true : false;
      }
    }
    return false;
  }
  */
  
  private auth_token: string | null = localStorage.getItem('token');
  private tokenChange = new BehaviorSubject<string | null>(this.auth_token);
  tokenChange$: Observable<string | null> = this.tokenChange.asObservable();

  constructor() {}

  handle(token: string): void {
    this.set(token);
    this.tokenChange.next(token); 
  }

  set(token: string): void {
    this.auth_token = token;
    localStorage.setItem('token', token);
  }

  get(): string | null {
    return this.auth_token;
  }

  remove(): void {
    this.auth_token = null;
    localStorage.removeItem('token');
    this.tokenChange.next(null); 
  }

  isValid(): boolean {
    if (this.auth_token) {
      const payload = this.decodePayload(this.auth_token);
      if (payload) {
        return payload.iss === "http://localhost:8000/api/admin/login" && payload.sub ? true : false;
      }
    }
    return false;
  }

  decodePayload(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  loggedIn(): boolean {
    return this.isValid();
  }
  getUserId() {
    const token = this.get();
    if (token) {
      const payload = this.decodePayload(token);
      if (payload && payload.sub) {
        return parseInt(payload.sub); // Convertir en nombre
      } else {
        console.error("User ID not found in token payload.");
        return null;
      }
    } else {
      console.error("Token not found.");
      return null;
    }
  }
  isAdmin(): boolean {
    const token = this.get();
    if (token) {
      const payload = this.decodePayload(token);
      if (payload && payload.sub) {
        return payload.user_type === 'admin';
      }
    }
    return false;
}
 getUserType(): string {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = this.decodePayload(token);
    if (payload && payload.type) {
      return payload.type;
    } else {
      console.error("User type not found in token payload.");
      return null;
    }
  } else {
    console.error("Token not found.");
    return null;
  }
}
}