// task-user.component.ts

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/shared/API_service/task.service';
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
      (response) => {
        this.columns[0].tasks = response.tasks.filter(task => task.status !== 'completed');
        this.columns[1].tasks = response.tasks.filter(task => task.status === 'completed');
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  onTaskDropped(event: CdkDragDrop<Task[]>, column: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(column.tasks, event.previousIndex, event.currentIndex);
    } else {
      const taskId = event.item.data.id;
      const task = this.findTaskById(taskId);
      if (task) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        task.status = column.title === 'to-do' ? 'to do' : 'completed';
        this.taskService.updateTaskStatus(task.id, task.status).subscribe(() => {
          console.log('Task status updated successfully.');
        }, (error) => {
          console.error('Error updating task status:', error);
          // Restore task status on error
          task.status = column.title === 'to-do' ? 'completed' : 'to do';
          // Reorder tasks to previous state
          moveItemInArray(event.container.data, event.currentIndex, event.previousIndex);
        });
      }
    }
  }
  
  findTaskById(id: number): Task | undefined {
    for (const column of this.columns) {
      const task = column.tasks.find(t => t.id === id);
      if (task) {
        return task;
      }
    }
    return undefined;
  }
}
