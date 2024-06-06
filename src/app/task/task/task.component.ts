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
            title: 'Add a Task',
            html: `
                <input type="text" id="taskName" class="swal2-input" placeholder="Task Name">
                <textarea id="taskDescription" class="swal2-textarea" placeholder="Description"></textarea>
                <input type="number" id="estimatedTime" class="swal2-input" placeholder="Estimated Time (in hours)">
                <select id="participantSelect" class="swal2-select">
                    <option value="" disabled selected>Choose a participant</option>
                    ${userOptions} <!-- Use the list of users here -->
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const taskName = (document.getElementById('taskName') as HTMLInputElement).value;
                const taskDescription = (document.getElementById('taskDescription') as HTMLTextAreaElement).value;
                const estimatedTime = parseFloat((document.getElementById('estimatedTime') as HTMLInputElement).value);
                const participantId = parseInt((document.getElementById('participantSelect') as HTMLSelectElement).value, 10);
            
                if (!taskName || !taskDescription || isNaN(estimatedTime) || isNaN(participantId)) {
                    Swal.showValidationMessage('All fields are required.');
                    return false;
                }
            
                const newTask: Task = {
                    id: 0,
                    user_id: participantId,
                    status: 'todo', // Set status to "to do"
                    estimated_time: estimatedTime,
                    name: taskName,
                    description: taskDescription
                };
    
                this.taskService.addTask(newTask).subscribe(
                    (response) => {
                        this.tasks.push(response); // Ajouter la tâche nouvellement ajoutée
                        Swal.fire('Success', 'The task has been successfully added.', 'success');
                    },
                    (error) => {
                        console.error('Error adding task:', error);
                        Swal.fire('Error', 'An error occurred while adding the task.', 'error');
                    }
                );
            }
        });
    }
    
    editerTache(task: Task) {
        Swal.fire({
            title: 'Edit Task',
            html: `
                <input type="text" id="taskName" class="swal2-input" placeholder="Task Name" value="${task.name}">
                <textarea id="taskDescription" class="swal2-textarea" placeholder="Description">${task.description}</textarea>
                <input type="number" id="estimatedTime" class="swal2-input" placeholder="Estimated Time (in hours)" value="${task.estimated_time}">
            `,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const taskName = (document.getElementById('taskName') as HTMLInputElement).value;
                const taskDescription = (document.getElementById('taskDescription') as HTMLTextAreaElement).value;
                const estimatedTime = parseFloat((document.getElementById('estimatedTime') as HTMLInputElement).value);
            
                if (!taskName || !taskDescription || isNaN(estimatedTime)) {
                    Swal.showValidationMessage('All fields are required.');
                    return false;
                }
            
                task.name = taskName;
                task.description = taskDescription;
                task.estimated_time = estimatedTime;
            
                this.taskService.updateTask(task.id, task).subscribe(() => {
                });
            }
            
        });
    }

    supprimerTache(id: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
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
