import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistics } from '../model/Statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8000/api/statistics/';

  constructor(private http: HttpClient) { }

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
}
