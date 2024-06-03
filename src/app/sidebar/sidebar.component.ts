import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/auth.guard';
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
    { path: '/compte-admin', title: 'Admins', type: 'link', icontype: 'nc-icon nc-single-02' },
    { path: '/companies/list', title: 'Companies', type: 'link', icontype: 'nc-icon nc-single-02' },
    { path: '/compte-participant', title: 'Participants', type: 'link', icontype: 'nc-icon nc-single-02' },
    { path: '/decision-admin', title: 'Decision Admin', type: 'link', icontype: 'nc-icon nc-box' },

    { path: '/chat', title: 'Chat', type: 'link', icontype: 'nc-icon nc-single-02' },
    { path: '/task-user', title: 'Task User', type: 'link', icontype: 'nc-icon nc-chart-bar-32' },

    { path: '/en-ligne', title: 'Meeting RSVP', type: 'link', icontype: 'nc-icon nc-laptop' },
    { path: '/decision', title: 'Decision', type: 'link', icontype: 'nc-icon nc-box' },
    { path: '/task', title: 'Task', type: 'link', icontype: 'nc-icon nc-chart-bar-32' },
    { path: '/document', title: 'Document', type: 'link', icontype: 'nc-icon nc-paper' },
    { path: '/reunion', title: 'Meeting', type: 'link', icontype: 'nc-icon nc-calendar-60' },
    { path: '/statistique', title: 'Statistics', type: 'link', icontype: 'nc-icon nc-chart-pie-36' },
  { path: '/meeting2', title: ' Meeting2', type: 'link', icontype: 'nc-icon nc-laptop' },  {
        path: '/pages',
        title: 'Pages',
        collapse: 'pages',
        type: 'sub',
        icontype: 'nc-icon nc-book-bookmark',
        children: [
            { path: 'user', title: 'User Page', ab: 'UP', icontype: '' },
        ]
    }];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
    public menuItems: RouteInfo[];
    userProfile: User;
    userType: string;

    constructor(private router: Router, private authService: AuthService, private auth: AuthStateService,
                private tokenService: TokenService, private authGuard: AuthGuard) {}

    ngOnInit() {
        this.userType = this.tokenService.getUserType();
        this.setMenuItemsBasedOnUserType();
        this.getUserProfile();
    }

    ngAfterViewInit() {}

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

    setMenuItemsBasedOnUserType() {
        if (this.userType === 'admin') {
            this.menuItems = ROUTES.filter(menuItem => [
                '/compte-participant', '/decision-admin', '/task', '/reunion','/document', '/statistique','/chat'
            ].includes(menuItem.path));
        } else if (this.userType === 'user') {
            this.menuItems = ROUTES.filter(menuItem => [
                '/en-ligne', '/decision','/document' ,'/task-user'
            ].includes(menuItem.path));
        } else if (this.userType === 'superadmin') {
            this.menuItems = ROUTES.filter(menuItem => [
                '/companies/list', '/compte-admin','/statistique',
            ].includes(menuItem.path));
        } else {
            this.menuItems = ROUTES.filter(menuItem => menuItem.path !== '/compte-admin' && menuItem.path !== '/companies/list');
        }
    }

    redirectToProfile() {
        this.router.navigate(['/profile']);
    }

    redirectToUser() {
        this.router.navigate(['/pages/user']);
    }

    signOut() {
        this.auth.setAuthState(false);
        this.tokenService.remove();
        this.router.navigate(['login']);
    }
}