import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { User } from '../model/user';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { CompanyService } from './company.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(private http: HttpClient, private token: TokenService,private router:Router,private companyservice:CompanyService ) {}
 
  login(user: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/admin/login', user);
  }

 
  
  register(user: User): Observable<any> {
    return this.http.post('http://localhost:8000/api/admin/signup', user);
  }
  sendResetPasswordLink(data) {
    return this.http.post('http://localhost:8000/api/reset-password-request', data)
}
resetPassword(data: any) {
  return this.http.post(
    'http://localhost:8000/api/change-password',
    data
  );
}

private apiUrl = 'http://localhost:8000/api';

getProfile(): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token.get()
  });

  return this.http.get<any>(`${this.apiUrl}/profile`, { headers: headers })
    .pipe(
      catchError(this.handleError)
    );
}

uploadProfilePhoto(file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('profile_photo', file, file.name);

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token.get()
  });

  return this.http.post<any>(`${this.apiUrl}/profile`, formData, { headers: headers })
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(error: any) {
  console.error('An error occurred:', error);
  return throwError(error);
}
updateProfile(profileData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token.get()
  });

  return this.http.put<any>(`${this.apiUrl}/updateprofil`, profileData, { headers: headers })
    .pipe(
      catchError(this.handleError)
    );
}

registerSadmin(sadminData: any): Observable<any> {
  return this.http.post('http://localhost:8000/api/signup', sadminData).pipe(
    catchError(this.handleError)
  );
}
}