import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

interface Task {
    nomUtilisateur: string;
    nom: string;
    description: string;
    tempsEstime: number;
    statut: string;
    isDone: boolean;
}

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    tasks: Task[] = [];

    ngOnInit() {
        // Initialisation de quelques tâches pour commencer
        this.tasks = [
            {
                nomUtilisateur: 'John Doe',
                nom: 'Sign contract for "What are conference organizers afraid of?"',
                description: 'Rédiger un contrat pour l\'événement',
                tempsEstime: 2,
                statut: 'to do',
                isDone: false
            },
            {
                nomUtilisateur: 'Jane Smith',
                nom: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
                description: 'Lire la littérature russe et examiner les e-mails',
                tempsEstime: 4,
                statut: 'to do',
                isDone: false
            }
            // Ajoutez d'autres tâches initiales ici si nécessaire
        ];
    }

    ajouterTache() {
        Swal.fire({
            title: 'Ajouter une tâche',
            html: `
                <input type="text" id="nomUtilisateur" class="swal2-input" placeholder="Nom d'utilisateur">
                <input type="text" id="nomTache" class="swal2-input" placeholder="Nom de la tâche">
                <textarea id="descriptionTache" class="swal2-textarea" placeholder="Description"></textarea>
                <input type="number" id="tempsEstime" class="swal2-input" placeholder="Temps estimé (en heures)">
            `,
            showCancelButton: true,
            confirmButtonText: 'Ajouter',
            cancelButtonText: 'Annuler',
            preConfirm: () => {
                const nomUtilisateur = (document.getElementById('nomUtilisateur') as HTMLInputElement).value;
                const nomTache = (document.getElementById('nomTache') as HTMLInputElement).value;
                const descriptionTache = (document.getElementById('descriptionTache') as HTMLTextAreaElement).value;
                const tempsEstime = parseFloat((document.getElementById('tempsEstime') as HTMLInputElement).value);
                
                // Validation des champs
                if (!nomUtilisateur || !nomTache || !descriptionTache || isNaN(tempsEstime)) {
                    Swal.showValidationMessage('Tous les champs sont obligatoires.');
                    return false;
                }
                
                // Retourner l'objet de la tâche créée
                return {
                    nomUtilisateur,
                    nom: nomTache,
                    description: descriptionTache,
                    tempsEstime,
                    statut: 'to do',
                    isDone: false
                };
            }
        }).then(result => {
            if (result.isConfirmed && typeof result.value !== 'boolean') {
                // Ajoute la tâche à la liste de tâches
                this.tasks.push(result.value as Task);
            }
        });
    }

  
  
}
