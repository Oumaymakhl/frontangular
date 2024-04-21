import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { CompteAdminModule } from './compte-admin/compte-admin.module';
import { ListeAdminComponent } from './compte-admin/liste-admin/liste-admin.component';
import { CompteAdminRoutingModule } from './compte-admin/compte-admin.routing';
import { ComptePartcipantRoutingModule } from './compte-participant/compte-partcipant.routing';
import { LoginComponent } from './login/login.component';
export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },{
        path: '',
        component: AdminLayoutComponent,
        children: [
        { 
            path: '',
            loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)
         },
         
        {
            path: 'components',
            loadChildren: () => import('./components/components.module').then(x=>x.ComponentsModule)
        },{
            path: 'forms',
            loadChildren: () => import('./form/form.module').then(x=>x.FormModule)
        },{
            path: 'tables',
            loadChildren:() => import( './tables/tables.module').then(x=>x.TablesModule)
        },{
            path: 'maps',
            loadChildren:() => import( './maps/maps.module').then(x=>x.MapsModule)
        },{
            path: 'charts',
            loadChildren:() => import( './charts/charts.module').then(x=>x.ChartsModule)
        },{
            path: 'calendar',
            loadChildren:() => import( './calendar/calendar.module').then(x=>x.CalendarModule)
        },{
            path: '',
            loadChildren:() => import( './userpage/user.module').then(x=>x.UserModule)
        },{
            path: '',
            loadChildren:() => import( './timeline/timeline.module').then(x=>x.TimelineModule)
        },{
            path: '',
            loadChildren:() => import( './widgets/widgets.module').then(x=>x.WidgetsModule)
        }, {
            path: '',
            loadChildren:() => import( './task/task.module').then(x=>x.TaskModule)
        }, {
            path: 'reunion',
            loadChildren:() => import( './reunion/reunion.module').then(x=>x.ReunionModule)
        }, {
            path: 'document',
            loadChildren:() => import( './document/document.module').then(x=>x.DocumentModule)
        },{
            path: 'compte-admin', // Chemin pour accéder au module du compte administrateur
            loadChildren: () => CompteAdminRoutingModule, // Utilisez le module de routage du compte admin
          }, {
            path: 'compte-participant', // Chemin pour accéder au module du compte administrateur
            loadChildren: () => ComptePartcipantRoutingModule, // Utilisez le module de routage du compte admin
          },]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren:() => import( './pages/pages.module').then(x=>x.PagesModule)
            }]
        },
        {
            path: 'login', // Chemin pour accéder au composant d'enregistrement
            component: LoginComponent, // Composant d'enregistrement
        }
        
];
