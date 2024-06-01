
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, from, map, tap, throwError } from 'rxjs';
import { Reunion } from '../model/reunion';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { TokenService } from './token.service';
import { Presence } from '../model/presence';

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
  private apiUrl = 'http://localhost:8000/api'; // URL de base de votre API Laravel

  constructor(private http: HttpClient, private token: TokenService) { }

  createReunion(reunion: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token.get()
    });
  console.log(reunion);
    return this.http.post<any>(`http://localhost:8000/api/reunion`, reunion,{headers:headers});
  }
  

  // Mettre à jour une réunion
  updateReunion(id: number, reunion: Reunion): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/reunions/${id}`, reunion);
  }

  deleteReunion(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8000/api/reunions/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error(`Réunion avec l'ID ${id} non trouvée.`);
        }
        return throwError('Erreur lors de la suppression de la réunion.');
      })
    );
  }

  getReunions(): Observable<listereunion> {
    return this.http.get<listereunion>(`http://localhost:8000/api/reunions`).pipe(
      tap(data => console.log('Réunions récupérées:', data)),
      catchError(error => {
        console.error('Erreur lors de la récupération des réunions:', error);
        return throwError(error);
      })
    );
  }
  getMeetingDetails(meetingId: number): Observable<Reunion> {
    return this.http.get<{ reunion: Reunion }>(`http://localhost:8000/api/reunion/${meetingId}`)
      .pipe(
        map(response => response.reunion),
        catchError(error => {
          console.error('Erreur lors de la récupération des détails de la réunion:', error);
          return throwError(error);
        })
      );
  }
  
  getParticipantsStatus(reunionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reunions/${reunionId}/participants-status`);
  }
  confirmParticipation(reunionId: number, userId: number, status: boolean, raison: string): Observable<any> {
    const participationData = {
        userId: userId,
        status: status,
        raison: raison
    };

    return this.http.post(`${this.apiUrl}/reunion/${reunionId}/confirm-participation`, participationData);
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
