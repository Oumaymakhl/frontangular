import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../model/task';
import { User } from '../model/user';
export interface listetask{
  status:number;
  tasks:Task[];
}
export interface taskEdit{
  status:number;
  tasks:Task[]; 
}
export interface taskajout{
  status:number;
  tasks:Task[]; 
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
  }

  updateTask(id: number, task: Task): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }

  getTasks(): Observable<{ tasks: Task[] }> {
    return this.http.get<{ tasks: Task[] }>(`${this.baseUrl}/tasks`);
  }

  updateTaskStatus(id: number, status: string): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/tasks/${id}/status`, { status });
  }
  getUsersByAdminCompanyId(): Observable<User[]> {
    // Get the authentication token from wherever you store it
    const authToken = 'YOUR_AUTH_TOKEN_HERE';

    // Set the headers with the authentication token
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') // Assurez-vous de récupérer le token d'authentification correctement
      })
    };

    // Make the HTTP GET request with the headers
    return this.http.get<{users: User[]}>(`${this.baseUrl}/admin/company/users`, httpOptions).pipe(
      map(response => response.users)
    );
  }
}