import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { ReunionService, listereunion } from 'app/shared/API_service/reunion.service';
import { ParticipantService } from 'app/shared/API_service/participant.service';
import { Reunion } from 'app/shared/model/reunion';
import { User } from 'app/shared/model/user';
import { Router } from '@angular/router'; 

declare var $: any;

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  reunions: Reunion[];
  users: User[];
  selectedUsers: number[] = []; 

  constructor(private reunionService: ReunionService, private participantService: ParticipantService, private router: Router) { }

  ngOnInit() {
    this.loadReunions();
    this.loadUsers();
    this.initializeCalendar();
  }

  loadReunions() {
    this.reunionService.getReunions().subscribe(
      (response: listereunion) => {
        this.reunions = response.reunions;
        this.renderCalendarEvents();
      },
      (error) => {
        console.error('Erreur lors de la récupération des réunions', error);
      }
    );
  }

  loadUsers() {
    this.participantService.getUsersByAdminCompanyId().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  initializeCalendar() {
    const $calendar = $('#fullCalendar');
    const self = this; // Référence à l'instance de la classe pour accès dans les fonctions de rappel
    
    $calendar.fullCalendar({
      viewRender: (view, element) => {
        if (view.name !== 'month') {
          const elem = $(element).find('.fc-scroller')[0];
          new PerfectScrollbar(elem);
        }
      },
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'prev,next,today'
      },
      selectable: true,
      selectHelper: true,
      views: {
        month: { titleFormat: 'MMMM YYYY' },
        week: { titleFormat: 'MMMM D YYYY' },
        day: { titleFormat: 'D MMM, YYYY' }
      },
      select: (start) => { self.createReunionDialog(start); }, 
      eventClick: (calEvent, jsEvent, view) => { this.updateOrDeleteReunionDialog(calEvent); },
      editable: true,
      eventLimit: true
    });
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
  createReunionDialog(start) {
    const userCheckboxes = this.users.map(user => `
      <label>
        <input type="checkbox" id="user-${user.id}" value="${user.id}"> ${user.nom} ${user.prenom}
      </label>
    `).join('');
  
    Swal.fire({
      title: 'Create a Meeting',
      html: `
        <div class="form-group">
          <input class="form-control" placeholder="Title" id="event-title">
        </div>
        <div class="form-group">
          <textarea class="form-control" placeholder="Description" id="event-description"></textarea>
        </div>
        <div class="form-group">
        <label for="participants-select">Select participants:</label>
${userCheckboxes}
</div>
<div class="form-group">
<label for="event-start">Start Date and Time:</label>
<input type="text" class="form-control" id="event-start" value="${start}">
</div>

      `,
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      customClass: { confirmButton: 'renion-btn', cancelButton: 'renion2-btn ' },
      buttonsStyling: false,
      preConfirm: () => {
        const title = $('#event-title').val();
        const description = $('#event-description').val();
        const selectedParticipants = this.getSelectedParticipants();
        const startDate = $('#event-start').val();
  
        if (!title || selectedParticipants.length === 0) {
          Swal.showValidationMessage('Le titre et au moins un participant sont requis.');
          return false;
        }
  
        return { title, description, selectedParticipants, startDate };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { title, description, selectedParticipants, startDate} = result.value;
        const newReunion: Reunion = { titre: title, description, date: startDate,  participants: selectedParticipants };
  
  
        this.reunionService.createReunion(newReunion).subscribe(
          (response) => {
  
            this.loadReunions(); // Rechargez les réunions après en avoir créé une nouvelle
            Swal.fire('Success', 'Meeting created successfully', 'success');
          },
          (error) => {
            console.error('Erreur lors de la création de la réunion', error);
            Swal.fire('Error', 'An error occurred while creating the meeting. Please try again.', 'error');
          }
        );
      }
    });
  }
  
  getSelectedParticipants(): number[] {
    const selectedParticipants: number[] = [];
    this.users.forEach(user => {
      const checkbox = document.getElementById(`user-${user.id}`) as HTMLInputElement;
      if (checkbox.checked) {
        selectedParticipants.push(user.id);
      }
    });
    return selectedParticipants;
  }
  
  updateOrDeleteReunionDialog(calEvent) {
    const { id, title, description, start } = calEvent;
  
    this.reunionService.getParticipantsStatus(id).subscribe(
      (response) => {
        const participants = response.users.map(user => {
          let statusText = "";
          if (user.status === 1) {
            statusText = "Available";
        } else if (user.status === 0) {
          statusText = `Unavailable - Reason: ${user.reason}`;
        }
          return `<p>${user.nom} ${user.prenom} - ${statusText}</p>`;
        }).join('');
  
        Swal.fire({
          title: 'Meeting Details',
        html: `
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Participants:</strong></p>
          ${participants}
          `,
          showCloseButton: true,
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonText: 'Delete',
          cancelButtonColor: '#d33',
          confirmButtonText: 'update',
          customClass: { confirmButton: 'bouton', cancelButton: 'btn btn-danger' },
          buttonsStyling: false
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Edit Meeting',
              html: `
              <div class="form-group">
              <input class="form-control" placeholder="Title" id="updated-event-title" value="${title}">
            </div>
            <div class="form-group">
              <textarea class="form-control" placeholder="Description" id="updated-event-description">${description}</textarea>
            </div>
              `,
              showCancelButton: true,
              confirmButtonText: 'Save',
              cancelButtonText: 'cancel',
              customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' },
              buttonsStyling: false,
              preConfirm: () => {
                const updatedTitle = $('#updated-event-title').val();
                const updatedDescription = $('#updated-event-description').val();
                
                if (!updatedTitle) {
                  Swal.showValidationMessage('Title is required.');
                }
                
                return { updatedTitle, updatedDescription };
              }
            }).then((result) => {
              if (result.isConfirmed) {
                const { updatedTitle, updatedDescription } = result.value;
                const updatedReunion: Reunion = { id, titre: updatedTitle, description: updatedDescription, date: start };
                
                this.reunionService.updateReunion(id, updatedReunion).subscribe(
                  () => {
                    // Mise à jour réussie, actualisez les données
                    this.loadReunions();
                    // Mettre à jour le titre de l'événement dans le calendrier
                    const updatedEvent = $('#fullCalendar').fullCalendar('clientEvents', id)[0];
                    if (updatedEvent) {
                      updatedEvent.title = updatedTitle;
                      $('#fullCalendar').fullCalendar('updateEvent', updatedEvent);
                    }
                    Swal.fire('Success', 'Meeting updated successfully', 'success');
                  },
                  (error) => {
                    console.error('Erreur lors de la mise à jour de la réunion', error);
                    Swal.fire('Error', 'An error occurred while updating the meeting. Please try again.', 'error');
                  }
                );
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            if (id) {
              this.reunionService.deleteReunion(id).subscribe(
                () => {
                  $('#fullCalendar').fullCalendar('removeEvents', id);
                  Swal.fire('Success', 'Meeting deleted successfully', 'success');
                },
                (error) => {
                  console.error('Erreur lors de la suppression de la réunion', error);
                  Swal.fire('Error', 'An error occurred while deleting the meeting. Please try again.', 'error');
                }
              );
            } else {
              console.error('L\'ID de la réunion est indéfini');
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des statuts des participants', error);
        Swal.fire('Error', 'An error occurred while retrieving participant statuses. Please try again.', 'error');
      }
    );
  }
} 