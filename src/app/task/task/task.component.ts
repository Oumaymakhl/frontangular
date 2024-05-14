import { Component, OnInit } from '@angular/core';
import { TaskService, listetask, taskajout, taskEdit } from 'app/shared/API_service/task.service'; // Importez le service TaskService et les interfaces correspondantes
import { Task } from 'app/shared/model/task'; // Assurez-vous de spécifier le chemin correct vers votre modèle Task
import Swal from 'sweetalert2';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    tasks: Task[] = [];

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        // Appelez une méthode pour récupérer toutes les tâches lorsque le composant est initialisé
        this.loadTasks();
    }

    // Méthode pour récupérer toutes les tâches depuis le service
    loadTasks(): void {
        this.taskService.getTasks().subscribe(
          (response: listetask) => { // Utilisez l'interface listetask pour typage de la réponse
            this.tasks = response.tasks;
            console.log(response);
          },
          (error) => {
            console.error('Error loading tasks:', error);
          }
        );
    }

    ajouterTache() {
        Swal.fire({
          title: 'Ajouter une tâche',
          html: `
            <input type="text" id="nomTache" class="swal2-input" placeholder="Nom de la tâche">
            <textarea id="descriptionTache" class="swal2-textarea" placeholder="Description"></textarea>
            <input type="number" id="tempsEstime" class="swal2-input" placeholder="Temps estimé (en heures)">
          `,
          showCancelButton: true,
          confirmButtonText: 'Ajouter',
          cancelButtonText: 'Annuler',
          preConfirm: () => {
            const nomTache = (document.getElementById('nomTache') as HTMLInputElement).value;
            const descriptionTache = (document.getElementById('descriptionTache') as HTMLTextAreaElement).value;
            const tempsEstime = parseFloat((document.getElementById('tempsEstime') as HTMLInputElement).value);
            
            // Validation des champs
            if (!nomTache || !descriptionTache || isNaN(tempsEstime)) {
              Swal.showValidationMessage('Tous les champs sont obligatoires.');
              return false;
            }
            
            // Créer la tâche avec le modèle Task
            const newTask: Task = {
              id: 0, // Vous pouvez attribuer une valeur factice à l'ID si nécessaire
              user_id: 0, // Vous pouvez attribuer une valeur factice à l'ID de l'utilisateur si nécessaire
              status: 'to do', // Valeur par défaut pour le statut
              estimated_time: tempsEstime,
              name: nomTache,
              description: descriptionTache
            };
    
            // Ajouter la tâche via le service TaskService
            this.taskService.addTask(newTask).subscribe((response) => {
              // Mettez à jour la liste des tâches après l'ajout réussi
              this.tasks.push(response);
            }, (error) => {
              console.error('Error adding task:', error);
              Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout de la tâche.', 'error');
            });
          }
        });
      }
    

    // Méthode pour éditer une tâche
    editerTache(task: Task) {
        Swal.fire({
            title: 'Modifier la tâche',
            html: `
                <input type="text" id="nomTache" class="swal2-input" placeholder="Nom de la tâche" value="${task.name}">
                <textarea id="descriptionTache" class="swal2-textarea" placeholder="Description">${task.description}</textarea>
                <input type="number" id="tempsEstime" class="swal2-input" placeholder="Temps estimé (en heures)" value="${task.estimated_time}">
            `,
            showCancelButton: true,
            confirmButtonText: 'Enregistrer',
            cancelButtonText: 'Annuler',
            preConfirm: () => {
                const nomTache = (document.getElementById('nomTache') as HTMLInputElement).value;
                const descriptionTache = (document.getElementById('descriptionTache') as HTMLTextAreaElement).value;
                const tempsEstime = parseFloat((document.getElementById('tempsEstime') as HTMLInputElement).value);
                
                // Validation des champs
                if (!nomTache || !descriptionTache || isNaN(tempsEstime)) {
                    Swal.showValidationMessage('Tous les champs sont obligatoires.');
                    return false;
                }
                
                // Mettre à jour la tâche avec le modèle Task
                task.name = nomTache;
                task.description = descriptionTache;
                task.estimated_time = tempsEstime;

                // Mettre à jour la tâche via le service TaskService
                this.taskService.updateTask(task.id, task).subscribe(() => {
                    // Pas besoin de faire quoi que ce soit ici, la tâche est déjà mise à jour localement
                });
            }
        });
    }

    // Méthode pour supprimer une tâche
    supprimerTache(id: number) {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Supprimer la tâche via le service TaskService
                this.taskService.deleteTask(id).subscribe(() => {
                    this.tasks = this.tasks.filter(task => task.id !== id);
                });
            }
        });
    }
}
