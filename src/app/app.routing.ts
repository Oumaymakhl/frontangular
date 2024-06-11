import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./userpage/user.module').then(m => m.UserModule) },
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule) },
      { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
      { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
      { path: 'reunion', loadChildren: () => import('./reunion/reunion.module').then(m => m.ReunionModule) },
      { path: 'document', loadChildren: () => import('./document/document.module').then(m => m.DocumentModule) },
      { path: 'compte-admin', loadChildren: () => import('./compte-admin/compte-admin.module').then(m => m.CompteAdminModule) },
      { path: 'chat', component: ChatComponent },
      { path: 'compte-participant', loadChildren: () => import('./compte-participant/compte-participant.module').then(m => m.CompteParticipantModule) },
      { path: 'companies', loadChildren: () => import('./company/company-routing.module').then(m => m.CompanyRoutingModule) },
      { path: 'en-ligne', loadChildren: () => import('./reunion2/reunion2.module').then(m => m.Reunion2Module) },
      { path: 'decision', loadChildren: () => import('./decision/decision.module').then(m => m.DecisionModule) },
      { path: 'decision-admin', loadChildren: () => import('./decision-admin/decision-admin.module').then(m => m.DecisionAdminModule) },
      { path: 'statistique', loadChildren: () => import('./statistique/statistique.module').then(m => m.StatistiqueModule) },
      { path: 'statistique1', loadChildren: () => import('./statistique1/statistique1.module').then(m => m.Statistique1Module) },
      { path: '', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
      { path: '', loadChildren: () => import('./taskuser/taskuser.module').then(m => m.TaskuserModule) },
      {
        path: 'meeting',
        loadChildren:() => import( './meeting/meeting.module').then(x=>x.MeetingModule)
    },
    {
        path: 'meeting2',
        loadChildren:() => import( './meeting2/meeting2.module').then(x=>x.Meeting2Module)
    },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: '**',
    redirectTo: '/login'
  },
  
];
