
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
export interface listeMessage{
  status:number;
  email:string;
  my:string;
  group:string;
  message:Message[];
}
@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private http: HttpClient) { }
  
  sendMessage(inputData: FormData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Assurez-vous de récupérer le token d'authentification correctement
    });
    return this.http.post('http://localhost:8000/api/chat/send', inputData,{ headers: headers });
  }
  
  getMessage() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Assurez-vous de récupérer le token d'authentification correctement
    });
    return this.http.get<listeMessage>(`http://localhost:8000/api/chat/group`,{ headers: headers });
  }
}
