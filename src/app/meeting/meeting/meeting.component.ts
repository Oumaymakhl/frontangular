import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService, listemeeting } from 'app/shared/API_service/meeting.service';
import { ParticipantService } from 'app/shared/API_service/participant.service';
import { Meeting } from 'app/shared/model/meeting';
import { User } from 'app/shared/model/user';
import { link } from 'fs';
import PerfectScrollbar from 'perfect-scrollbar';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  reunions: Meeting[];
  users: User[];

  constructor(private meetingService: MeetingService, private participantService: ParticipantService, private router: Router) { }

  ngOnInit() {
    this.loadReunions();
    this.loadUsers();
    this.initializeCalendar();
  }

  loadReunions() {
    this.meetingService.getMeeting().subscribe(
      (response: listemeeting) => {
        this.reunions = response.meetings;
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
      select: (start) => { self.createReunionDialog(start); }, // Passer la date sélectionnée à la fonction createReunionDialog
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
      description: reunion.description,
      link:reunion.link
    }));

    $('#fullCalendar').fullCalendar('renderEvents', events, true);
  }
  createReunionDialog(start) {
    const userOptions = this.users.map(user => `<option value="${user.id}">${user.nom} ${user.prenom}</option>`).join('');
    
    Swal.fire({
      title: 'Créer une réunion',
      html: `
        <div class="form-group">
          <input class="form-control" placeholder="Titre" id="event-title">
        </div>
        <div class="form-group">
          <textarea class="form-control" placeholder="Description" id="event-description"></textarea>
        </div>
        <div class="form-group">
          <label for="participants-select">Sélectionnez les participants:</label>
          <select class="form-control" id="participants-select" multiple>
            ${userOptions}
          </select>
        </div>
        <div class="form-group">
          <label for="event-start">Date et heure de début:</label>
          <input type="text" class="form-control" id="event-start" value="${start}">
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Lien de réunion (facultatif)" id="event-link">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Créer',
      cancelButtonText: 'Annuler',
      customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' },
      buttonsStyling: false,
      preConfirm: () => {
        const title = $('#event-title').val();
        const description = $('#event-description').val();
        const participantIds = $('#participants-select').val();
        const startDate = $('#event-start').val();
        const link = $('#event-link').val() || ''; // Récupérer la valeur du lien ou laisser vide si aucun lien n'est saisi
  
        if (!title || !participantIds.length) {
          Swal.showValidationMessage('Le titre et au moins un participant sont requis.');
          return false;
        }
  
        return { title, description, participantIds, startDate, link }; 
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { title, description, participantIds, startDate, link } = result.value;
        const newMeeting: Meeting = { titre: title, description, date: startDate, participants: participantIds, link }; 
  
        this.meetingService.createMeeting(newMeeting).subscribe(
          (response) => {
            console.log(response);
            this.loadReunions(); // Recharger les réunions après en avoir créé une nouvelle
            Swal.fire('Succès', 'Réunion créée avec succès', 'success');
          },
          (error) => {
            console.error('Erreur lors de la création de la réunion', error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la création de la réunion. Veuillez réessayer.', 'error');
          }
        );
      }
    });
  }
  
  
  updateOrDeleteReunionDialog(calEvent) {
    const { id, title, description, link, start } = calEvent;
  
    Swal.fire({
      title: 'Détails de la réunion',
      html: `
        <p><strong>Titre:</strong> ${title}</p>
        <p><strong>Description:</strong> ${description}</p>
        ${link ? `<p><strong>Lien:</strong> ${link}</p>` : ''}
      `,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Supprimer',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modifier',
      customClass: { confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger' },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        // Logique pour la modification de la réunion
        Swal.fire({
          title: 'Modifier la réunion',
          html: `
            <div class="form-group">
              <input class="form-control" placeholder="Titre" id="updated-event-title" value="${title}">
            </div>
            <div class="form-group">
              <textarea class="form-control" placeholder="Description" id="updated-event-description">${description}</textarea>
            </div>
            <div class="form-group">
              <input class="form-control" placeholder="Lien de réunion" id="updated-event-link" value="${link || ''}">
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Enregistrer',
          cancelButtonText: 'Annuler',
          customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' },
          buttonsStyling: false,
          preConfirm: () => {
            const updatedTitle = $('#updated-event-title').val();
            const updatedDescription = $('#updated-event-description').val();
            const updatedLink = $('#updated-event-link').val();
  
            if (!updatedTitle) {
              Swal.showValidationMessage('Le titre est requis.');
            }
            
            return { updatedTitle, updatedDescription, updatedLink }; // Retourner également le lien mis à jour
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const { updatedTitle, updatedDescription, updatedLink } = result.value;
            const updateMeeting: Meeting = { id, titre: updatedTitle, description: updatedDescription, date: start, link: updatedLink }; // Ajouter le lien mis à jour
            
            this.meetingService.updateMeeting(id, updateMeeting).subscribe(
              () => {
                // Mise à jour réussie, actualisez les données
                this.loadReunions();
                // Mettre à jour le titre de l'événement dans le calendrier
                const updatedEvent = $('#fullCalendar').fullCalendar('clientEvents', id)[0];
                if (updatedEvent) {
                  updatedEvent.title = updatedTitle;
                  $('#fullCalendar').fullCalendar('updateEvent', updatedEvent);
                }
                Swal.fire('Succès', 'Réunion mise à jour avec succès', 'success');
              },
              (error) => {
                console.error('Erreur lors de la mise à jour de la réunion', error);
                Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour de la réunion. Veuillez réessayer.', 'error');
              }
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Logique pour supprimer la réunion
        if (id) {
          this.meetingService.deleteMeeting(id).subscribe(
            () => {
              // Supprimer l'événement du calendrier
              $('#fullCalendar').fullCalendar('removeEvents', id);
              Swal.fire('Succès', 'Réunion supprimée avec succès', 'success');
            },
            (error) => {
              console.error('Erreur lors de la suppression de la réunion', error);
              Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de la réunion. Veuillez réessayer.', 'error');
            }
          );
        } else {
          console.error('L\'ID de la réunion est indéfini');
        }
      }
    });
  }
  
}
