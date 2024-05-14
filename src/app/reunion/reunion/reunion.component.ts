import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';
import { ReunionService, listereunion } from 'app/shared/API_service/reunion.service';
import { Reunion } from 'app/shared/model/reunion';

declare var $: any;

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  reunions: Reunion[];

  constructor(private reunionService: ReunionService) { }

  ngOnInit() {
    // Appel de la méthode getReunions du service
    this.reunionService.getReunions().subscribe(
      (response: listereunion) => { // Adaptation du type de paramètre
        // Utilisez la liste de réunions retournée par le service ici
        const reunions: Reunion[] = response.reunions;
        this.initializeCalendarEvents();
      },
      (error) => {
        console.error('Erreur lors de la récupération des réunions', error);
      }
    );

    const $calendar = $('#fullCalendar');
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    // Configurer le calendrier FullCalendar
    $calendar.fullCalendar({
      viewRender: function(view, element) {
        // Active le perfect scrollbar si la vue n'est pas en mode mois
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
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
        month: {
          titleFormat: 'MMMM YYYY'
        },
        week: {
          titleFormat: 'MMMM D YYYY'
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },
      select: (start, end) => {
        this.createReunionDialog(start, end);
      },
      eventClick: (calEvent, jsEvent, view) => {
        this.updateOrDeleteReunionDialog(calEvent);
      },
      editable: true,
      eventLimit: true, // Autorise le lien "plus" lorsqu'il y a trop d'événements
    });
  }

  initializeCalendarEvents() {
    // Convertir les réunions en événements compatibles avec FullCalendar
    const events = this.reunions.map(reunion => ({
      title: reunion.titre,
      start: reunion.start,
      end: reunion.end,
      description: reunion.description
      // Autres propriétés de réunion que vous souhaitez afficher dans le calendrier
    }));

    // Configurer les événements du calendrier
    $('#fullCalendar').fullCalendar('renderEvents', events, true);
  }

  // Ouvrir la boîte de dialogue pour créer une réunion
  private createReunionDialog(start, end) {
    Swal.fire({
      title: 'Créer une réunion',
      html: `
        <div class="form-group">
          <input class="form-control" placeholder="Titre" id="event-title">
        </div>
        <div class="form-group">
          <textarea class="form-control" placeholder="Description" id="event-description"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Créer',
      cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
      preConfirm: () => {
        const titleElement = document.getElementById('event-title') as HTMLInputElement;
        const descriptionElement = document.getElementById('event-description') as HTMLTextAreaElement;
        const title = titleElement.value;
        const description = descriptionElement.value;

        if (!title) {
          Swal.showValidationMessage('Le titre est requis.');
        }

        return {
          title,
          description
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, description } = result.value;
        const newReunion: Reunion = {
          titre: title,
          description,
          start,
          end
        };
        

        // Appeler la méthode du service pour créer une réunion
        this.reunionService.createReunion(newReunion).subscribe(
          (response) => {
            // Réussite
            console.log('Réunion créée avec succès', response);
            // Actualiser le calendrier pour afficher la nouvelle réunion
            $('#fullCalendar').fullCalendar('renderEvent', newReunion, true);
          },
          (error) => {
            // Erreur
            console.error('Erreur lors de la création de la réunion', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Une erreur est survenue lors de la création de la réunion. Veuillez réessayer.',
            });
          }
        );
      }
    });
  }

  // Ouvrir la boîte de dialogue pour mettre à jour ou supprimer une réunion existante
  private updateOrDeleteReunionDialog(calEvent) {
    const updateForm = `
      <div class="form-group">
        <label for="updateTitle">Titre:</label>
        <input type="text" id="updateTitle" class="form-control" value="${calEvent.title}">
      </div>
      <div class="form-group">
        <label for="updateDescription">Description:</label>
        <textarea id="updateDescription" class="form-control">${calEvent.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label for="updateStartDate">Date de début:</label>
        <input type="text" id="updateStartDate" class="form-control" value="${calEvent.start.format('YYYY-MM-DD HH:mm')}">
      </div>
      <div class="form-group">
        <label for="updateEndDate">Date de fin:</label>
        <input type="text" id="updateEndDate" class="form-control" value="${calEvent.end ? calEvent.end.format('YYYY-MM-DD HH:mm') : ''}">
      </div>
    `;

    Swal.fire({
      title: 'Modifier la réunion',
      html: updateForm,
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Supprimer',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = (<HTMLInputElement>document.getElementById('updateTitle')).value;
        const description = (<HTMLTextAreaElement>document.getElementById('updateDescription')).value;
        const startDate = (<HTMLInputElement>document.getElementById('updateStartDate')).value;
        const endDate = (<HTMLInputElement>document.getElementById('updateEndDate')).value;

        // Vous pouvez gérer ici la mise à jour des données dans votre application
        // Remplacez ce code par l'appel à votre API ou la mise à jour de vos données en fonction de votre logique métier

        // Pour cet exemple, nous afficherons simplement un message de succès
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
            Swal.fire({
              title: 'Mise à jour réussie',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }, 1000); // Simuler un délai de chargement
        });
      }
    });

    // Ajouter le gestionnaire d'événements pour le bouton "Delete"
    Swal.getCancelButton().addEventListener('click', () => {
      // Afficher une boîte de confirmation pour supprimer l'événement
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          // Vous pouvez gérer ici la suppression des données dans votre application
          // Remplacez ce code par l'appel à votre API ou la suppression de vos données en fonction de votre logique métier

          // Pour cet exemple, nous afficherons simplement un message de succès
          Swal.fire({
            title: 'Événement supprimé',
            text: 'L\'événement a été supprimé avec succès',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      });
    });
  }
}
