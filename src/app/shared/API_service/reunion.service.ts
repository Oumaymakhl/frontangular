
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, from, tap, throwError } from 'rxjs';
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
  
  // Récupérer les utilisateurs invités à une réunion spécifique
  getInvitedUsers(companyId: number, reunionId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/companies/${companyId}/reunions/${reunionId}/invited-users`);
  }

  // Inviter des utilisateurs à une réunion
  inviteUsers(reunionId: number, userId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/reunions/invite-users`, { reunion_id: reunionId, user_id: userId });
  }
}
