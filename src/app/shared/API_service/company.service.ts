import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
export interface listecompany{
  status:number;
  companies:Company[];
}
export interface companyEdit{
  status:number;
  company:Company[]; 
}
export interface CompanyDetails {
  company: Company;
  admin_id: number;
}
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }
  
 
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
  /*getCompanyDetails(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/company/details/${id}`);
  }*/
 /* getCompanyDetails(id: number): Observable<any> {
    const token = this.tokenService.get();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<any>(`http://localhost:8000/api/company/details/${id}`, { headers });
    } else {
      console.error("Token not found.");
      return null;
    }
  }*/
  getCompanyDetails(id: number): Observable<CompanyDetails> {
    return this.http.get<CompanyDetails>(`http://localhost:8000/api/company/details/${id}`);
  }

 
}

