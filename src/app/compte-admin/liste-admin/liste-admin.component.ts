import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/shared/API_service/admin.service';
import { Admin } from 'app/shared/model/admin';

@Component({
  moduleId: module.id,
  selector: 'liste-admin',
  templateUrl: './liste-admin.component.html',
  styleUrls: ['./liste-admin.component.css']
})

export class ListeAdminComponent implements OnInit {
  admins: Admin[];
  searchTerm: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (response: any) => {
        this.admins = response.admins;
      },
      (error) => {
        console.error('Error loading admins:', error);
      }
    );
  }

  ajouterAdmin(): void {
    this.router.navigate(['/compte-admin/ajout']);
  }

  delete(event: any, id: number): void {
    if (confirm('Are you sure?')) {
      event.target.innerText = 'deleting';
      this.adminService.delete(id).subscribe(() => {
        this.loadAdmins();
      });
    }
  }

  filteredAdmins(): Admin[] {
    return this.admins.filter((admin: Admin) =>
      admin.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
