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


    constructor(private http: HttpClient) { }
  
    getTasks(): Observable<listetask> {
      return this.http.get<listetask>('http://localhost:8000/api/tasks');
    }
  
    addTask(task: Task): Observable<Task> {
      return this.http.post<Task>('http://localhost:8000/api/tasks', task);
    }
  
    getTask(id: number): Observable<taskEdit> {
      return this.http.get<taskEdit>(`http://localhost:8000/api/tasks/${id}`);
    }
  
    updateTask(id: number, task: Task): Observable<any> {
      return this.http.put(`http://localhost:8000/api/tasks/${id}`, task);
    }
 
    deleteTask(id: number): Observable<any> {
      return this.http.delete(`http://localhost:8000/api/tasks/${id}`);
    }
  }