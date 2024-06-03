import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { CompteAdminRoutingModule } from './compte-admin/compte-admin.routing';
import { ComptePartcipantRoutingModule } from './compte-participant/compte-partcipant.routing';
import { LoginComponent } from './login/login.component';
import { CompanyRoutingModule } from './company/company-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [{
    
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard], 
        children: [
            {
         path: '',loadChildren:() => import( './userpage/user.module').then(x=>x.UserModule)
            },
          { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule) },
          { path: 'components', loadChildren: () => import('./components/components.module').then(x => x.ComponentsModule) },
          { path: 'forms', loadChildren: () => import('./form/form.module').then(x => x.FormModule) },
        
          { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(x => x.CalendarModule) },
          { path: 'reunion', loadChildren: () => import('./reunion/reunion.module').then(x => x.ReunionModule) },
          { path: 'document', loadChildren: () => import('./document/document.module').then(x => x.DocumentModule) },
          { path: 'compte-admin', loadChildren: () => import('./compte-admin/compte-admin.module').then(x => x.CompteAdminModule) },
          { path: 'chat', component: ChatComponent }, // ChatComponent ne nécessite pas d'authentification
          { path: 'compte-participant', loadChildren: () => import('./compte-participant/compte-participant.module').then(x => x.CompteParticipantModule) },
          { path: 'companies', loadChildren: () => import('./company/company-routing.module').then(x => x.CompanyRoutingModule) },
          { path: 'en-ligne', loadChildren: () => import('./reunion2/reunion2.module').then(x => x.Reunion2Module) },
          { path: 'decision', loadChildren: () => import('./decision/decision.module').then(x => x.DecisionModule) },
          { path: 'decision-admin', loadChildren: () => import('./decision-admin/decision-admin.module').then(x => x.DecisionAdminModule) },
          { path: 'statistique', loadChildren: () => import('./statistique/statistique.module').then(x => x.StatistiqueModule) },
       
       
            path: '',
            loadChildren:() => import( './task/task.module').then(x=>x.TaskModule)
        }, {
            path: '',
            loadChildren:() => import( './taskuser/taskuser.module').then(x=>x.TaskuserModule)
        } ]
      },
      
      {
        path: 'login', // Chemin pour accéder au composant d'enregistrement
        component: LoginComponent, // Composant d'enregistrement
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth-routing.module').then(x => x.AuthRoutingModule)
      },
      {
        path: '**',
        redirectTo: '/login'
      }     

       ,
       
        {
            path: 'meeting2',
            loadChildren:() => import( './meeting2/meeting2.module').then(x=>x.Meeting2Module)
        },
       

];
