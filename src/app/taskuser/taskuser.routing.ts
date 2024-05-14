import { Routes } from "@angular/router";
import { TaskUserComponent } from "./task-user/task-user.component";

export const TaskUserRoutes: Routes = [{
    path: '',
    children: [{
        path: 'task-user',
        component: TaskUserComponent
    }]
}];