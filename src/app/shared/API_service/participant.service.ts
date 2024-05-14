import { Injectable } from '@angular/core';
import { Participant } from '../model/participant';
import { HttpClient } from '@angular/common/http';

export interface listeparticipant{
  status:number;
  particpants:Participant[];
}
export interface participantEdit{
  status:number;
  participant:Participant[]; 
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  getparticipants() {
    return this.http.get<listeparticipant>(`http://localhost:8000/api/user`);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:8000/api/user/${id}`);
  }

  getParticipant(id: number) {
    return this.http.get<participantEdit>(`http://localhost:8000/api/user/${id}`)
  }

  updateparticipant(inputData: object, id: number) {
    return this.http.put(`http://localhost:8000/api/user/${id}`, inputData)
  }
  saveparticipant(inputData: FormData) {
    return this.http.post('http://localhost:8000/api/user/signup', inputData);
  }
}
