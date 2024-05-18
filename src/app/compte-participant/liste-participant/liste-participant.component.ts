import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from 'app/shared/API_service/participant.service';
import { Participant } from 'app/shared/model/participant';

@Component({
  selector: 'app-liste-participant',
  templateUrl: './liste-participant.component.html',
  styleUrls: ['./liste-participant.component.css']
})

export class ListeParticipantComponent implements OnInit {

  participants: Participant[];
  searchTerm: string = '';

  constructor(private participantService: ParticipantService, private router: Router) { }

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.participantService.getparticipants().subscribe(
      (response: any) => {
        this.participants = response.users;
        console.log(response);
      },
      (error) => {
        console.error('Error loading participants:', error);
      }
    );
  }

  deleteParticipant(event: any, id: number): void {
    if (confirm('Are you sure you want to delete this participant?')) {
      event.target.innerText = "Deleting";
      this.participantService.delete(id).subscribe((res: any) => {
        this.loadParticipants();
      });
    }
  }

  ajouterParticipant(): void {
    this.router.navigate(['/compte-participant/ajout']);
  }

  filteredParticipants(): Participant[] {
    return this.participants.filter((participant: Participant) =>
      participant.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
