import { Component, OnInit } from '@angular/core';
import { TaskService, listetask } from 'app/shared/API_service/task.service';
import { Task } from 'app/shared/model/task';
import Swal from 'sweetalert2';
import { ParticipantService } from 'app/shared/API_service/participant.service';
import { forkJoin } from 'rxjs';
import { User } from 'app/shared/model/user';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
    tasks: Task[] = [];
    users: User[] = [];
    searchTerm: string = '';

    constructor(private taskService: TaskService, private participantService: ParticipantService) { }

    ngOnInit() {
        this.loadTasks();
        this.loadUsers();
    }

    loadTasks(): void {
        this.taskService.getTasks().subscribe(
            (response) => {
                this.tasks = response.tasks;
                const userNameObservables = this.tasks.map(task =>
                    this.participantService.getUserNameById(task.user_id)
                );
                forkJoin(userNameObservables).subscribe(
                    userNames => {
                        this.tasks.forEach((task, index) => {
                            task.userName = userNames[index];
                        });
                    },
                    error => {
                        console.error('Error fetching user names:', error);
                    }
                );
            },
            (error) => {
                console.error('Error loading tasks:', error);
            }
        );
    }

    loadUsers(): void {
        this.taskService.getUsersByAdminCompanyId().subscribe(
            (users) => {
                console.log('Users loaded:', users);  // Diagnostic
                this.users = users;
            },
            (error) => {
                console.error('Error loading users:', error);
            }
        );
    }
    ajouterTache() {
        console.log('Current users:', this.users);  // Diagnostic
        if (!Array.isArray(this.users) || this.users.length === 0) {
            console.error('No users available:', this.users);
            return;
        }
    
        const userOptions = this.users.map(user => `<option value="${user.id}">${user.nom} ${user.prenom}</option>`).join('');
        console.log('User options:', userOptions); // Diagnostic
    
        Swal.fire({
                title: 'Ajouter une tâche',
                html: `
                    <input type="text" id="nomTache" class="swal2-input" placeholder="Nom de la tâche">
                    <textarea id="descriptionTache" class="swal2-textarea" placeholder="Description"></textarea>
                    <input type="number" id="tempsEstime" class="swal2-input" placeholder="Temps estimé (en heures)">
                    <select id="participantSelect" class="swal2-select">
                        <option value="" disabled selected>Choisissez un participant</option>
                        ${userOptions} <!-- Utiliser la liste des utilisateurs ici -->
                    </select>
                `,
            showCancelButton: true,
            confirmButtonText: 'Ajouter',
            cancelButtonText: 'Annuler',
            preConfirm: () => {
                const nomTache = (document.getElementById('nomTache') as HTMLInputElement).value;
                const descriptionTache = (document.getElementById('descriptionTache') as HTMLTextAreaElement).value;
                const tempsEstime = parseFloat((document.getElementById('tempsEstime') as HTMLInputElement).value);
                const participantId = parseInt((document.getElementById('participantSelect') as HTMLSelectElement).value, 10);
    
                if (!nomTache || !descriptionTache || isNaN(tempsEstime) || isNaN(participantId)) {
                    Swal.showValidationMessage('Tous les champs sont obligatoires.');
                    return false;
                }
    
                const newTask: Task = {
                    id: 0,
                    user_id: participantId,
                    status: 'todo', // Définir le statut sur "à faire"
                    estimated_time: tempsEstime,
                    name: nomTache,
                    description: descriptionTache
                };
    
                this.taskService.addTask(newTask).subscribe(
                    (response) => {
                        // Ajoutez simplement la nouvelle tâche à votre liste de tâches existante
                        this.tasks.push(response); // Ajouter la tâche nouvellement ajoutée
                        // Vous pouvez également afficher un message de réussite ou effectuer d'autres actions nécessaires
                        Swal.fire('Succès', 'La tâche a été ajoutée avec succès.', 'success');
                    },
                    (error) => {
                        console.error('Error adding task:', error);
                        Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout de la tâche.', 'error');
                    }
                );
            }
        });
    }
    
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

                if (!nomTache || !descriptionTache || isNaN(tempsEstime)) {
                    Swal.showValidationMessage('Tous les champs sont obligatoires.');
                    return false;
                }

                task.name = nomTache;
                task.description = descriptionTache;
                task.estimated_time = tempsEstime;

                this.taskService.updateTask(task.id, task).subscribe(() => {
                });
            }
        });
    }

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
                this.taskService.deleteTask(id).subscribe(() => {
                    this.tasks = this.tasks.filter(task => task.id !== id);
                });
            }
        });
    }

    filteredTasks(): Task[] {
        return this.tasks.filter((task: Task) =>
            task.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
}
