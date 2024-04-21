import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../model/company';
export interface listecompany{
  status:number;
  companies:Company[];
}
export interface companyEdit{
  status:number;
  company:Company[]; 
}
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }
  
 
  getCompany() {
    return this.http.get<listecompany>(`http://localhost:8000/api/companies/index`);
  }
  delete(id: number) {
    return this.http.delete(`http://localhost:8000/api/companies/destroy/${id}`);
  }
  getcompanie(id:number){
    return this.http.get<companyEdit>(`http://localhost:8000/api/companies/show/${id}`)
  }
  updatecompany(inputData:object,id:number){
    return this.http.put(`http://localhost:8000/api/companies/update/${id}`,inputData)
  }
}

