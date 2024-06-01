
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
  
      // Vérifier si les paramètres de requête contiennent les identifiants de réunion et d'utilisateur
      if (this.reunionId && this.userId) {
        // Charger les réunions et afficher la fenêtre modale de confirmation dans la logique de succès de loadReunions()
        this.loadReunions();
      } else {
        // Charger les réunions si les paramètres de requête ne sont pas disponibles
        this.loadReunions();
      }
    });
  }
  
  loadReunions() {
    this.reunionService.getReunions().subscribe(
      (response: any) => {
        this.reunions = response.reunions;
        this.renderCalendarEvents();
        this.initializeCalendar(); // Initialise le calendrier après le rendu des événements
        
        // Vérifier si les paramètres de requête contiennent les identifiants de réunion et d'utilisateur
        if (this.reunionId && this.userId) {
          this.showConfirmationForm({ id: this.reunionId });
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des réunions', error);
      }
    );
  }
  
  initializeCalendar() {
    const $calendar = $('#fullCalendar');
    const self = this;

    $calendar.fullCalendar({
      // Autres options du calendrier...

      events: this.reunions.map(reunion => ({
        id: reunion.id,
        title: reunion.titre,
        start: reunion.date,
        description: reunion.description
      })),
      
      eventClick: (calEvent, jsEvent, view) => {
        // Vérifier si l'utilisateur a le droit de confirmer sa présence
        if (this.canConfirmPresence(calEvent.id)) {
          // Afficher la fenêtre modale de confirmation
          this.showConfirmationForm(calEvent);
        } else {
          // Afficher un message indiquant que l'utilisateur n'a pas le droit de confirmer sa présence
          Swal.fire('Accès refusé', 'Vous n\'avez pas le droit de confirmer votre présence à cette réunion.', 'error');
        }
      },
      
      // Autres options du calendrier...
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

  showConfirmationForm(calEvent): void {
    const { id } = calEvent;

    // Récupérer les détails de la réunion en utilisant l'ID de l'événement
    const selectedReunion = this.reunions.find(reunion => reunion.id === id);

    // Utiliser SweetAlert pour afficher le formulaire de confirmation
    Swal.fire({
      title: `${selectedReunion.titre || 'Titre non disponible'} - Détails de la réunion`,
      html: `
        <p><strong>Description:</strong> ${selectedReunion.description || 'Description non disponible'}</p>
        <p><strong>Date:</strong> ${selectedReunion.date || 'Date non disponible'}</p>
        <div class="form-group">
          <label for="raison">Raison (facultatif):</label>
          <input type="text" id="raison" class="form-control">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Disponible',
      cancelButtonText: 'Indisponible',
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

  // Vérifier si l'utilisateur peut confirmer sa présence à la réunion spécifiée
  canConfirmPresence(reunionId: number): boolean {
    // Comparer les IDs de la réunion dans l'URL avec l'ID de la réunion spécifiée
    return this.reunionId === reunionId;
  }

  // Envoyer la confirmation au backend
  sendConfirmation(reunionId): void {
    this.reunionService.confirmParticipation(reunionId, this.userId, this.status, this.raison).subscribe(
      response => {
        console.log('Confirmation de participation envoyée avec succès !');
        Swal.fire('Confirmation envoyée', '', 'success');
      },
      error => {
        console.error('Erreur lors de la confirmation de participation :', error);
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la confirmation de participation', 'error');
      }
    );
  }
}