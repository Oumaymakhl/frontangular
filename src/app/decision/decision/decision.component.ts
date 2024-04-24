import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent {
  decisions = [
    { text: 'Deciscion 1' },
    { text: 'Decision 2' },
    { text: 'Decision 3' }
  ];

  likeDecision(decision: any) {
    Swal.fire('Liked!', decision.text, 'success');
  }

  dislikeDecision(decision: any) {
    Swal.fire('Disliked!', decision.text, 'error');
  }
}
