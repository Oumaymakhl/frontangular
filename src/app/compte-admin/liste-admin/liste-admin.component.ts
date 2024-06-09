import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/shared/API_service/admin.service';
import { Admin } from 'app/shared/model/admin';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      width: '350px', 
      heightAuto: false, 
      customClass: {
        container: 'custom-swal-container', 
      },
    }).then((result) => {
      if (result.isConfirmed) {
        event.target.innerText = 'Deleting';
        this.adminService.delete(id).subscribe(() => {
          this.loadAdmins();
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          );
        });
      }
    });
  }
  filteredAdmins(): Admin[] {
    return this.admins.filter((admin: Admin) =>
      admin.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
