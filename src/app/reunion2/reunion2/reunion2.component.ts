
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { ReunionService, listereunion } from 'app/shared/API_service/reunion.service';
import { Reunion } from 'app/shared/model/reunion';
import { User } from 'app/shared/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from 'app/shared/API_service/participant.service';
declare var $: any;

@Component({
  selector: 'app-reunion2',
  templateUrl: './reunion2.component.html',
  styleUrls: ['./reunion2.component.css']
})
export class Reunion2Component implements OnInit {
  reunions: Reunion[];
  userId: number;
  status: boolean;
  raison: string;
  reunionId: number;

  constructor(private route: ActivatedRoute, private reunionService: ReunionService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reunionId = +params['reunionId'];
      this.userId = +params['userId'];
  
      if (this.reunionId && this.userId) {
        this.loadReunions();
      } else {
        this.loadReunions();
      }
    });
  }
  
  loadReunions() {
    this.reunionService.getReunions().subscribe(
      (response: any) => {
        this.reunions = response.reunions;
        this.renderCalendarEvents();
        this.initializeCalendar(); 
        
        if (this.reunionId && this.userId) {
          this.showConfirmationForm({ id: this.reunionId });
        }
      },
      (error) => {
        console.error('Error retrieving meetings', error);
      }
    );
  }
  
  initializeCalendar() {
    const $calendar = $('#fullCalendar');
    const self = this;

    $calendar.fullCalendar({

      events: this.reunions.map(reunion => ({
        id: reunion.id,
        title: reunion.titre,
        start: reunion.date,
        description: reunion.description
      })),
      
      eventClick: (calEvent, jsEvent, view) => {
        if (this.canConfirmPresence(calEvent.id)) {
          this.showConfirmationForm(calEvent);
        } else {
          Swal.fire('Access Denied', 'You do not have permission to confirm your attendance to this meeting', 'error');
        }
      },
      
$    });
  }

  renderCalendarEvents() {
    const events = this.reunions.map(reunion => ({
      id: reunion.id,
      title: reunion.titre,
      start: reunion.date,
      description: reunion.description
    }));

    $('#fullCalendar').fullCalendar('renderEvents', events, true);
  }

  showConfirmationForm(calEvent): void {
    const { id } = calEvent;

    const selectedReunion = this.reunions.find(reunion => reunion.id === id);

    Swal.fire({
      title: `${selectedReunion.titre || 'Title Not Available'} - Meeting Details`,
      html: `
        <p><strong>Description:</strong> ${selectedReunion.description || 'Description not available'}</p>
        <p><strong>Date:</strong> ${selectedReunion.date || 'Date not available'}</p>
        <div class="form-group">
          <label for="raison">Reason (optional):</label>
          <input type="text" id="raison" class="form-control">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Available',
      cancelButtonText: 'Unavailable',
    }).then((result) => {
      if (result.isConfirmed) {
        this.status = true;
        this.raison = (document.getElementById('raison') as HTMLInputElement).value;
        this.sendConfirmation(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.status = false;
        this.raison = (document.getElementById('raison') as HTMLInputElement).value;
        this.sendConfirmation(id);
      }
    });
  }

  canConfirmPresence(reunionId: number): boolean {
    return this.reunionId === reunionId;
  }

  sendConfirmation(reunionId): void {
    this.reunionService.confirmParticipation(reunionId, this.userId, this.status, this.raison).subscribe(
      response => {
        Swal.fire('Confirmation sent', '', 'success');



      },
      error => {
        Swal.fire('Error', 'An error occurred while confirming attendance', 'error');
      }
    );
  }
}