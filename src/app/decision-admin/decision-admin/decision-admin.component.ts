import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-decision-admin',
  templateUrl: './decision-admin.component.html',
  styleUrls: ['./decision-admin.component.css']
})
export class DecisionAdminComponent {
  decisions = [
    { title: 'Decision 1', description: 'Description de la décision 1', likes: 10, dislikes: 5 },
    { title: 'Decision 2', description: 'Description de la décision 2', likes: 8, dislikes: 3 },
    { title: 'Decision 3', description: 'Description de la décision 3', likes: 15, dislikes: 2 }
    // Ajoutez d'autres décisions selon vos besoins
  ];

  constructor() { }

  ajouterDecision() {
    Swal.fire({
      title: 'Ajouter une décision',
      html:
        '<input id="title" class="swal2-input" placeholder="Titre">' +
        '<input id="description" class="swal2-input" placeholder="Description">',
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const titleInput = document.getElementById('title') as HTMLInputElement;
        const descriptionInput = document.getElementById('description') as HTMLInputElement;

        if (titleInput && descriptionInput) {
          const title = titleInput.value;
          const description = descriptionInput.value;
          
          // Ajoutez la décision à la liste après confirmation
          this.decisions.push({ title: title, description: description, likes: 0, dislikes: 0 });
          
          // Afficher une alerte de confirmation
          Swal.fire('Ajouté!', 'La décision a été ajoutée avec succès.', 'success');
        }
      }
    });
  }
  supprimerDecision(decision: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas récupérer cette décision!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprime la décision de la liste
        const index = this.decisions.indexOf(decision);
        if (index !== -1) {
          this.decisions.splice(index, 1);
        }

        Swal.fire(
          'Supprimé!',
          'Votre décision a été supprimée.',
          'success'
        );
      }
    });
  }
}
