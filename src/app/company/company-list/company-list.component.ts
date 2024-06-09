import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'app/shared/API_service/company.service';
import { Company } from 'app/shared/model/company';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];
  searchTerm: string = '';

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompany().subscribe(
      (response) => {
        this.companies = response.companies;
        console.log(response);
      },
      (error) => {
        console.error('Error loading companies:', error);
      }
    );
  }

 

  deleteCompany(event: any, id: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this company?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      width:'350',
    }).then((result) => {
      if (result.isConfirmed) {
        event.target.innerText = 'Deleting';
        this.companyService.delete(id).subscribe((res: any) => {
          this.loadCompanies();
          Swal.fire(
            'Deleted!',
            'Your company has been deleted.',
            'success'
          );
        });
      }
    });
  }
  
  ajouterCompany(): void {
    this.router.navigate(['/companies/list/ajout']);
  }

  filteredCompanies(): Company[] {
    return this.companies.filter((company: Company) =>
      company.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      company.adresse.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
