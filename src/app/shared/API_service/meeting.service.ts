import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Meeting } from '../model/meeting';
import { TokenService } from './token.service';
export interface listemeeting{
  status:number;
  meetings:Meeting[];
}
export interface meetingEdit{
  status:number;
  meetings:Meeting[];
}
export interface meetingajout{
  status:number;
  meetings:Meeting[];
}
@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:8000/api/meetings'; // URL de votre API Laravel pour les réunions

  constructor(private http: HttpClient, private token: TokenService) { }

  // Méthode pour récupérer toutes les réunions
  getMeeting(): Observable<listemeeting> {
    return this.http.get<listemeeting>(`http://localhost:8000/api/meetings`).pipe(
      tap(data => console.log('Réunions récupérées:', data)),
      catchError(error => {
        console.error('Erreur lors de la récupération des réunions:', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour créer une nouvelle réunion
  createMeeting(meeting: Meeting): Observable<Meeting> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token.get()
    });
    console.log(meeting);
    return this.http.post<any>(`http://localhost:8000/api/meetings`, meeting,{headers:headers});
  }


  updateMeeting(id: number, meeting: Meeting): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/api/meetings/${id}`, meeting);
  }
  // Méthode pour supprimer une réunion
  deleteMeeting(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // Autres méthodes pour effectuer des opérations CRUD sur les réunions
}
