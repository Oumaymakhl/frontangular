import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from 'app/shared/API_service/participant.service';
import { Participant } from 'app/shared/model/participant';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this participant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      width: '350px',
      heightAuto: false,
      customClass: {
        container: 'custom-swal-container', 
       
      },
    }).then((result) => {
      if (result.isConfirmed) {
        event.target.innerText = "Deleting";
        this.participantService.delete(id).subscribe((res: any) => {
          this.loadParticipants();
          Swal.fire(
            'Deleted!',
            'The participant has been deleted.',
            'success'
          );
        });
      }
    });
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
