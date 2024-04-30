import { Component, OnInit } from '@angular/core';
import { DecisionService } from 'app/shared/API_service/decision.service';
import { Decision } from 'app/shared/model/decision';
import Swal from 'sweetalert2';
import { Like } from 'app/shared/model/like';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {
  decisions: Decision[] = [];

  constructor(private decisionService: DecisionService) {}

  ngOnInit(): void {
    this.getDecisions();
  }

  getDecisions(): void {
    this.decisionService.getDecisions().subscribe(
      (data: any) => {
        this.decisions = data.decisions;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des décisions : ', error);
      }
    );
  }
  
  likeDecision(decision: Decision): void {
    this.decisionService.likeDecision(decision.id).subscribe(
      () => {
        // Mettre à jour le nombre de likes dans la liste de décisions
        decision.likes = (decision.likes || 0) + 1; // Incrémenter le nombre de likes de la décision
        // Afficher une alerte de succès
        Swal.fire('Liked!', decision.description, 'success');
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout du like : ', error);
      }
    );
  }
  
  dislikeDecision(decision: Decision): void {
    this.decisionService.dislikeDecision(decision.id).subscribe(
      () => {
        // Mettre à jour le nombre de dislikes dans la liste de décisions
        decision.dislikes = (decision.dislikes || 0) + 1; // Incrémenter le nombre de dislikes de la décision
        // Afficher une alerte de succès
        Swal.fire('Disliked!', decision.description, 'error');
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout du dislike : ', error);
      }
    );
  }
}
