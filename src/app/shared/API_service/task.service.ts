import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
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
  
}