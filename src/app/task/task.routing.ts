import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';

export const TaskRoutes: Routes = [{
    path: '',
    children: [{
        path: 'task',
        component: TaskComponent
    }]
}];
