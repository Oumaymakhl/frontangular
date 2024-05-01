
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Reunion } from '../model/reunion';
import { Injectable } from '@angular/core';
export interface listereunion{
  status:number;
  reunions:Reunion[];
}
export interface reunionEdit{
  status:number;
  reunions:Reunion[];
}
export interface reunionajout{
  status:number;
  reunions:Reunion[];
}
@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  constructor(private http: HttpClient) { }

  // Créer une réunion
  createReunion(reunion: Reunion): Observable<Reunion> {
    return this.http.post<Reunion>(`http://localhost:8000/api/reunions`, reunion);
  }

  // Mettre à jour une réunion
  updateReunion(id: number, reunion: Reunion): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/reunions/${id}`, reunion);
  }

  // Supprimer une réunion
  deleteReunion(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/reunions/${id}`);
  }

  // Récupérer toutes les réunions
  getReunions(): Observable<listereunion> {
    return this.http.get<listereunion>(`http://localhost:8000/api/reunions`);
  }
 
  // Récupérer les utilisateurs invités à une réunion spécifique
  getInvitedUsers(companyId: number, reunionId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/companies/${companyId}/reunions/${reunionId}/invited-users`);
  }

  // Inviter des utilisateurs à une réunion
  inviteUsers(reunionId: number, userId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/reunions/invite-users`, { reunion_id: reunionId, user_id: userId });
  }
}
