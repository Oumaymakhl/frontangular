import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import { AdminService } from 'app/shared/API_service/admin.service';
import { Admin } from 'app/shared/model/admin';

@Component({
    moduleId: module.id,
    selector: 'liste-admin',
    templateUrl: './liste-admin.component.html'
})

export class  ListeAdminComponent implements OnInit{
  
    admins: Admin[];

    constructor(private adminService: AdminService, private router: Router) { }
    ngOnInit(): void {
      this.loadAdmins();
    }
  
    loadAdmins(): void {
      this.adminService.getAdmins().subscribe(
        (response: any) => {
          this.admins = response.admins;
          console.log(response);
        },
        (error) => {
          console.error('Error loading admins:', error);
        }
      );
    }
    ajouterAdmin() {
      this.router.navigate(['/compte-admin/ajout']); 
    }
  
    delete(event: any, id: number): void {
      if (confirm('Are you sure?')) {
        event.target.innerText = "deleting";
        this.adminService.delete(id).subscribe((res: any) => {
          this.loadAdmins();
        });
      }
    }
  }