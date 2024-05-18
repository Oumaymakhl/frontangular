import { Component, OnInit } from '@angular/core';
import { DecisionService } from 'app/shared/API_service/decision.service';
import { Decision } from 'app/shared/model/decision';
import Swal from 'sweetalert2';

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
        decision.likes_count++;
        decision.alreadyLiked = true;
        Swal.fire('Liked!', decision.title, 'success');
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout du like : ', error);
      }
    );
  }

  dislikeDecision(decision: Decision): void {
    this.decisionService.dislikeDecision(decision.id).subscribe(
      () => {
        decision.dislikes_count++;
        decision.alreadyDisliked = true;
        Swal.fire('Disliked!', decision.title, 'error');
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de l\'ajout du dislike : ', error);
      }
    );
  }
}
