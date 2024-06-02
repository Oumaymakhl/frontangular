import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reunion2Component } from 'app/reunion2/reunion2/reunion2.component';
import { AuthStateService } from 'app/shared/API_service/auth-state.service';
import { AuthService } from 'app/shared/API_service/auth.service';
import { TokenService } from 'app/shared/API_service/token.service';
import { User } from 'app/shared/model/user';

export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab?: string;
    type?: string;
    icontype: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', type: 'link', icontype: 'nc-icon nc-bank' },
  {
        path: 'compte-admin',
        title: 'Admins',
        type: 'link',
        icontype: 'nc-icon nc-single-02'
    },
    {
        path: '/companies/list',
        title: 'Companies',
        type: 'link',
        icontype: 'nc-icon nc-single-02'
    },
    ,
    { path: '/compte-participant', title: 'Participants', type: 'link', icontype: 'nc-icon nc-single-02' },
    { path: '/chat', title: 'chat', type: 'link', icontype: 'nc-icon nc-single-02' },
    { path: '/statistique', title: 'Statistics', type: 'link', icontype: 'nc-icon nc-chart-pie-36' },
    { path: '/en-ligne', title: 'Online Meeting', type: 'link', icontype: 'nc-icon nc-laptop' },
    { path: '/meeting', title: ' Meeting1', type: 'link', icontype: 'nc-icon nc-laptop' },
    { path: '/meeting2', title: ' Meeting2', type: 'link', icontype: 'nc-icon nc-laptop' },
    { path: '/decision', title: 'Decision', type: 'link', icontype: 'nc-icon nc-box' },
    { path: '/decision-admin', title: 'Decision Admin', type: 'link', icontype: 'nc-icon nc-box' },
    { path: '/task', title: 'Task', type: 'link', icontype: 'nc-icon nc-chart-bar-32' },
    { path: '/task-user', title: 'Task User', type: 'link', icontype: 'nc-icon nc-chart-bar-32' },
    { path: '/reunion', title: 'Meeting', type: 'link', icontype: 'nc-icon nc-calendar-60' },
    { path: '/document', title: 'Document', type: 'link', icontype: 'nc-icon nc-paper' },
   
    {
        path: '/pages',
        title: 'Pages',
        collapse: 'pages',
        type: 'sub',
        icontype: 'nc-icon nc-book-bookmark',
        children: [
            { path: 'user', title: 'User Page', ab: 'UP', icontype: '' },
        ]
    },
    {
        path: '/auth',
        title: 'Auth',
        type: 'sub',
        collapse: 'auth',
        icontype: 'nc-icon nc-layout-11',
        children: [
            { path: 'reset', title: 'Reset', ab: 'R', icontype: '' },
            { path: 'change', title: 'Change', ab: 'ch', icontype: '' },
        ]
    }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit, AfterViewInit {
    public menuItems: RouteInfo[];
    userProfile: User;

    constructor(private router: Router, private authService: AuthService, private auth: AuthStateService,
        private tokenService: TokenService,) {}

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.getUserProfile();
    }

    ngAfterViewInit() {}

    redirectToProfile() {
        this.router.navigate(['/profile']);
    }

    redirectToUser() {
        this.router.navigate(['/pages/user']);
    }

    getUserProfile() {
        this.authService.getProfile().subscribe(
            (data: any) => {
                this.userProfile = data.profile;
            },
            (error: any) => {
                console.error('Error fetching user profile:', error);
            }
        );
        }
        signOut() {
            // Appel de la méthode setAuthState pour mettre à jour l'état d'authentification à false
            this.auth.setAuthState(false);
            // Suppression du token du service TokenService
            this.tokenService.remove();
            // Redirection vers la page de login
            this.router.navigate(['login']);
        } 
}
