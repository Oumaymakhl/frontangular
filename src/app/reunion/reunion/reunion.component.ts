import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'perfect-scrollbar';

declare var $: any;

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  ngOnInit() {
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
      select: function(start, end) {
        // Afficher l'alerte SweetAlert2 avec les champs nécessaires pour créer un événement
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
          preConfirm: function() {
            // Récupérer les valeurs saisies dans l'alerte
            const titleElement = document.getElementById('event-title') as HTMLInputElement;
            const descriptionElement = document.getElementById('event-description') as HTMLTextAreaElement;
            const title = titleElement.value;
            const description = descriptionElement.value;

            // Valider les valeurs saisies
            if (!title) {
              Swal.showValidationMessage('Le titre est requis.');
            }

            // Retourner un objet contenant les valeurs
            return {
              title,
              description
            };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const { title, description } = result.value;

            // Créer un nouvel événement avec le titre et la description
            const eventData = {
              title,
              description,
              start,
              end
            };

            // Ajouter l'événement au calendrier
            $calendar.fullCalendar('renderEvent', eventData, true);
          }
          // Désélectionner après l'ajout de l'événement
          $calendar.fullCalendar('unselect');
        });
      },
      eventClick: function(calEvent, jsEvent, view) {
        // Afficher les détails de la réunion existante avec SweetAlert2
        Swal.fire({
            title: calEvent.title,
            html: `
                <div class="form-group">
                    <strong>Description:</strong> ${calEvent.description || 'Aucune description'}
                </div>
                <div class="form-group">
                    <strong>Date et heure:</strong> ${calEvent.start.format('DD/MM/YYYY HH:mm')} - ${calEvent.end ? calEvent.end.format('DD/MM/YYYY HH:mm') : 'Aucune heure de fin'}
                </div>
                <div class="form-group" id="reason-section">
                    <input class="form-control" placeholder="Raison de non disponibilité" id="reason-text">
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Dispo',
            cancelButtonText: 'Non dispo',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger',
            },
            buttonsStyling: false,
            preConfirm: function() {
                // Obtenir le champ d'entrée pour la raison de non disponibilité
                const reasonElement = document.getElementById('reason-text') as HTMLInputElement;
                // Obtenir la valeur de l'élément si elle existe
                const reason = reasonElement ? reasonElement.value : '';
                return { reason };
            }
        }).then((result) => {
            // Si l'utilisateur a cliqué sur "Dispo"
            if (result.isConfirmed) {
                Swal.fire('Vous êtes disponible pour cette réunion.');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // L'utilisateur a cliqué sur "Non dispo"
                const reason = result.value.reason;
                if (reason) {
                    // Afficher une autre alerte avec la raison fournie
                    Swal.fire({
                        title: 'Non disponible',
                        text: `Raison: ${reason}`,
                        icon: 'info',
                        confirmButtonText: 'Fermer'
                    });
                } else {
                    // Si aucune raison n'est fournie, demander une raison
                    Swal.fire({
                        title: 'Veuillez fournir une raison pour votre non disponibilité',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    }
,    

/*eventClick: function(calEvent, jsEvent, view) {
        // Afficher les détails de la réunion existante avec SweetAlert2
        Swal.fire({
          title: calEvent.title,
          html: `
            <div class="form-group">
              <strong>Description:</strong> ${calEvent.description || 'Aucune description'}
            </div>
            <div class="form-group">
              <strong>Date et heure:</strong> ${calEvent.start.format('DD/MM/YYYY HH:mm')} - ${calEvent.end ? calEvent.end.format('DD/MM/YYYY HH:mm') : 'Aucune heure de fin'}
            </div>
          `,
          confirmButtonText: 'Fermer',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false
        });
      },*/
      editable: true,
      eventLimit: true, // Autorise le lien "plus" lorsqu'il y a trop d'événements
      events: [
        {
          title: 'All Day Event',
          start: new Date(y, m, 1),
          className: 'event-default'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d - 4, 6, 0),
          allDay: false,
          className: 'event-rose'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d + 3, 6, 0),
          allDay: false,
          className: 'event-rose'
        },
        {
          title: 'Meeting',
          start: new Date(y, m, d - 1, 10, 30),
          allDay: false,
          className: 'event-green'
        },
        {
          title: 'Lunch',
          start: new Date(y, m, d + 7, 12, 0),
          end: new Date(y, m, d + 7, 14, 0),
          allDay: false,
          className: 'event-red'
        },
        {
          title: 'Md-pro Launch',
          start: new Date(y, m, d - 2, 12, 0),
          allDay: true,
          className: 'event-azure'
        },
        {
          title: 'Birthday Party',
          start: new Date(y, m, d + 1, 19, 0),
          end: new Date(y, m, d + 1, 22, 30),
          allDay: false,
          className: 'event-azure'
        },
        {
          title: 'Click for Creative Tim',
          start: new Date(y, m, 21),
          end: new Date(y, m, 22),
          url: 'https://www.creative-tim.com/',
          className: 'event-orange'
        }
      ]
    });
  }
}
