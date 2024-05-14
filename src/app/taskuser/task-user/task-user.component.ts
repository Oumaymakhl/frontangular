import { Component, OnInit } from '@angular/core';
import { TaskService, listetask } from 'app/shared/API_service/task.service';
import { Task } from 'app/shared/model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: listetask) => {
        this.columns[0].tasks = response.tasks.filter(task => task.status !== 'completed');
        this.columns[1].tasks = response.tasks.filter(task => task.status === 'completed');
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  onTaskDropped(event: CdkDragDrop<string[]>, column: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(column.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
