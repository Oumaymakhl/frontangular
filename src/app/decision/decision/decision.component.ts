import { Component, OnInit } from '@angular/core';
import { DecisionService } from 'app/shared/API_service/decision.service';
import { Decision } from 'app/shared/model/decision';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {
  decisions: Decision[] ;
  loading = false;

  constructor(private decisionService: DecisionService) {}

  ngOnInit(): void {
    this.getDecisions();
    this.getDecisionsWithLikesAndDislikes(); // Utiliser la nouvelle méthode pour récupérer les décisions avec les likes et dislikes
  }

  getDecisionsWithLikesAndDislikes(): void {
    this.loading = true;
    this.decisionService.getDecisionsWithLikesAndDislikes().pipe(
        catchError(error => {
            Swal.fire('Error!', 'Failed to load decisions.', 'error');
            return throwError(error);
        })
    ).subscribe(
        (data: any) => {
            this.decisions = data.decisions.map((decision: Decision) => {
                decision.likes_count = decision.likes_count;
                decision.dislikes_count = decision.dislikes_count;
                return decision;
            });
            this.loading = false;
        }
    );
}



  getDecisions(): void {
    this.loading = true;
    this.decisionService.getDecisions().pipe(
      catchError(error => {
        Swal.fire('Error!', 'Failed to load decisions.', 'error');
        return throwError(error);
      })
    ).subscribe(
      (data: any) => {
        this.decisions = data.decisions;
        this.loading = false;
      }
    );
  }

 
  likeDecision(decision: Decision): void {
    this.decisionService.likeDecision(decision.id).pipe(
      catchError(error => {
        Swal.fire('Error!', 'Failed to like decision.', 'error');
        return throwError(error);
      })
    ).subscribe(
      (data: any) => {
        decision.likes_count = data.likes_count; 
        decision.dislikes_count = data.dislikes_count; 
        Swal.fire('Liked!', decision.title, 'success');
      }
    );
  }

  dislikeDecision(decision: Decision): void {
    this.decisionService.dislikeDecision(decision.id).pipe(
      catchError(error => {
        Swal.fire('Error!', 'Failed to dislike decision.', 'error');
        return throwError(error);
      })
    ).subscribe(
      (data: any) => {
        decision.likes_count = data.likes_count; // Mettre à jour le compteur de likes avec la valeur renvoyée par le serveur
        decision.dislikes_count = data.dislikes_count; // Mettre à jour le compteur de dislikes avec la valeur renvoyée par le serveur
        Swal.fire('Disliked!', decision.title, 'error');
      }
    );
  }
}