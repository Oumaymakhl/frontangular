import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Decision } from '../model/decision';
import { Like } from '../model/like';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {

  private baseUrl = 'http://localhost:8000/api/decisions';

  constructor(private http: HttpClient) { }

  getDecisionsWithLikesAndDislikes() {
    return this.http.get<any>('http://localhost:8000/api/decisions');
  }
  
  getDecisions(): Observable<Decision[]> {
    return this.http.get<Decision[]>(this.baseUrl);
  }

  addDecision(decision: Decision): Observable<any> {
    return this.http.post<any>(this.baseUrl, decision);
  }

  getDecision(id: number): Observable<Decision> {
    return this.http.get<Decision>(`${this.baseUrl}/${id}`);
  }

  updateDecision(id: number, decision: Decision): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, decision);
  }

  deleteDecision(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  likeDecision(decisionId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Assurez-vous de récupérer le token d'authentification correctement
    });

    return this.http.post<any>(`${this.baseUrl}/${decisionId}/like`, {}, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  dislikeDecision(decisionId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Assurez-vous de récupérer le token d'authentification correctement
    });

    return this.http.post<any>(`${this.baseUrl}/${decisionId}/dislike`, {}, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getLikesForDecision(decisionId: number): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.baseUrl}/${decisionId}/likes`);
  }

  getDislikesForDecision(decisionId: number): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.baseUrl}/${decisionId}/dislikes`);
  }

  getAllLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(`http://localhost:8000/api/likes`);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
