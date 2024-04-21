import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
export interface listeadmin{
  status:number;
  admins:Admin[];
}
export interface adminEdit{
  status:number;
  admin:Admin[]; 
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  
  saveadmin(inputData:object){
    return this.http.post('http://localhost:8000/api/admin/signup',inputData);
  }
  getAdmins() {
    return this.http.get<listeadmin>(`http://localhost:8000/api/admin`);
  }
  delete(id: number) {
    return this.http.delete(`http://localhost:8000/api/admin/${id}`);
  }
  getAdmin(id:number){
    return this.http.get<adminEdit>(`http://localhost:8000/api/admin/${id}/edit`)
  }
  updateadmin(inputData:object,id:number){
    return this.http.put(`http://localhost:8000/api/admin/${id}`,inputData)
  }
}
