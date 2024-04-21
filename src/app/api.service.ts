import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PasswordValidation } from './form/validationforms/password-validator.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez cela par l'URL de votre API Laravel

  constructor(private http: HttpClient,private passwordValidation: PasswordValidation) { }

  // Authentification
  sadminSignup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sadmin/signup`, userData);
  }

  sadminLogin(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sadmin/login`, userData);
  }

  adminSignup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/signup`, userData);
  }
  

  adminLogin(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`, userData);
  }

  userSignup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/signup`, userData);
  }

  userLogin(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, userData);
  }

  // Companies
  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/companies/index`);
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/companies/show/${id}`);
  }

  updateCompany(id: number, companyData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/companies/update/${id}`, companyData);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/companies/destroy/${id}`);
  }

  // Reunions
  getReunions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reunions`);
  }

  createReunion(reunionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reunions`, reunionData);
  }

  updateReunion(id: number, reunionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reunions/${id}`, reunionData);
  }

  deleteReunion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/reunions/${id}`);
  }

  getInvitedUsers(companyId: number, reunionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/companies/${companyId}/reunions/${reunionId}/invited-users`);
  }

  inviteUsers(inviteData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reunions/invite-users`, inviteData);
  }

  // Documents
  importDocument(documentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/documents/import`, documentData);
  }

  exportDocument(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/documents/${id}/export`);
  }

  signDocument(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/documents/${id}/sign`);
  }

  downloadSignedDocument(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/documents/${id}/download`);
  }

  // Decisions
  getDecisions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/decisions`);
  }

  createDecision(decisionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decisions`, decisionData);
  }

  updateDecision(id: number, decisionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/decisions/${id}`, decisionData);
  }

  deleteDecision(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/decisions/${id}`);
  }

  likeDecision(decisionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decisions/${decisionId}/like`, {});
  }

  dislikeDecision(decisionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decisions/${decisionId}/dislike`, {});
  }

  likeDecision2(decisionId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decisions2/${decisionId}/like/${userId}`, {});
  }

  dislikeDecision2(decisionId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decisions2/${decisionId}/dislike/${userId}`, {});
  }

  // Tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, taskData);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${id}`);
  }

  updateTask(id: number, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/${id}`, taskData);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${id}`);
  }

  // Statistics
  getTotals(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics/totals`);
  }

  getAverageReunionsPerUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics/average-reunions-per-user`);
  }

  getTasksByStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics/tasks-by-status`);
  }

  getTaskCompletionRateByUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics/task-completion-rate-by-user`);
  }
}

