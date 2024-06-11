import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/shared/API_service/task.service';
import { Task } from 'app/shared/model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TokenService } from 'app/shared/API_service/token.service';

@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.css']
})
export class TaskUserComponent implements OnInit {
  columns = [
    { title: 'to-do', tasks: [] },
    { title: 'completed', tasks: [] }
  ];

  constructor(private taskService: TaskService, private tokenService: TokenService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    const loggedInUserId = this.tokenService.getUserId(); // Récupère l'ID de l'utilisateur connecté à partir du token
    if (loggedInUserId) {
      this.taskService.getTasks().subscribe(
        (response) => {
          const userTasks = response.tasks.filter(task => task.user_id === loggedInUserId);
          this.columns[0].tasks = userTasks.filter(task => task.status !== 'completed');
          this.columns[1].tasks = userTasks.filter(task => task.status === 'completed');
        },
        (error) => {
          console.error('Error loading tasks:', error);
        }
      );
    } else {
      console.error('No logged-in user found.'); // Gérer le cas où aucun utilisateur n'est connecté
    }
  }


  onTaskDropped(event: CdkDragDrop<Task[]>, column: any) {
    console.log('Task dropped:', event);
    const task = event.item.data;

    if (event.previousContainer === event.container) {
      console.log('Moving item in the same container');
      moveItemInArray(column.tasks, event.previousIndex, event.currentIndex);
    } else {
      console.log('Transferring item between containers');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const newStatus = column.title === 'to-do' ? 'to do' : 'completed';
      task.status = newStatus;
      console.log('Updating task status to:', newStatus);

      this.taskService.updateTaskStatus(task.id, task.status).subscribe(
        () => {
          console.log('Task status updated successfully.');
        },
        (error) => {
          console.error('Error updating task status:', error);
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      );
    }
  }
}
