import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Decision } from '../model/decision';
import { Like } from '../model/like'; // Importez l'interface Like ici
import { TokenService } from './token.service';  // Importez le TokenService

@Injectable({
  providedIn: 'root'
})
export class DecisionService {


  private baseUrl = 'http://localhost:8000/api/decisions';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenService.get();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  dislikeDecision(decisionId: number): Observable<any> {
    const userId = this.tokenService.getUserId(); 
    if (!userId) {
      return throwError('User ID not found in token.');
    }

    const url = `${this.baseUrl}/${decisionId}/dislike`;
    return this.http.post(url, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
  likeDecision(decisionId: number): Observable<any> {
    const userId = this.tokenService.getUserId(); // Obtenez l'ID de l'utilisateur à partir du token
    if (!userId) {
      return throwError('User ID not found in token.');
    }

    const url = `${this.baseUrl}/${decisionId}/like`;
    return this.http.post(url, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
  getDecisionsWithLikesAndDislikes(): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.getAuthHeaders() });
  }
  getDecisions(): Observable<Decision[]> {
    return this.http.get<Decision[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  addDecision(decision: Decision): Observable<any> {
    const userType = this.tokenService.getUserType();
    if (userType !== 'admin') {
      return throwError('Only admins can add decisions.');
    }
  
    return this.http.post<any>(this.baseUrl, decision, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
  
  getDecision(id: number): Observable<Decision> {
    return this.http.get<Decision>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateDecision(id: number, decision: Decision): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, decision, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteDecision(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getLikesForDecision(decisionId: number): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.baseUrl}/${decisionId}/likes`, { headers: this.getAuthHeaders() });
  }

  getDislikesForDecision(decisionId: number): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.baseUrl}/${decisionId}/dislikes`, { headers: this.getAuthHeaders() });
  }

  getAllLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(`http://localhost:8000/api/likes`, { headers: this.getAuthHeaders() });
  }
}