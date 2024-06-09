import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistics } from '../model/Statistics';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8000/api/statistics/';
  constructor(private http: HttpClient) { }
// Fonction pour ajouter un en-tête d'autorisation à chaque requête


  getTotals(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'totals');
  }

  getAverageReunionsPerUser(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'average-reunions-per-user');
  }

  getTasksByStatus(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'tasks-by-status');
  }

  taskCompletionRateByUser(): Observable<any> { 
    return this.http.get<any>(this.apiUrl + 'task-completion-rate-by-user');
  }

  getAverageTasksPerUser(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'average-tasks-per-user');
  }

  getUsersByCompany(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'users-by-company');
  }

  getTasksCompletedVsIncomplete(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'tasks-completed-vs-incomplete');
  }

  getTasksPerUser(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'tasks-per-user');
  }

  getCompletedTasksPerUser(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'completed-tasks-per-user');
  }
  getAdminCount(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'admin-count');
  }

  getDocumentCount(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'document-count');
  }

  getDecisionCount(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'decision-count');
  }

  getLikeDislikeComparison(): Observable<Statistics> {
    return this.http.get<Statistics>(this.apiUrl + 'like-dislike-comparison');
  }

  getDecisionCountAdmin(): Observable<Statistics> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Statistics>(this.apiUrl + 'decision-countAdmin', { headers: headers });
  }

  getTaskCountAdmin(): Observable<Statistics> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Statistics>(this.apiUrl + 'task-countAdmin', { headers: headers });
  }
}
