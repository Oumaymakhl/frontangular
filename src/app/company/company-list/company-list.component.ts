import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'app/shared/API_service/company.service';
import { Company } from 'app/shared/model/company';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];
  
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
    if (confirm('Are you sure you want to delete this company?')) {
      event.target.innerText = "Deleting";
      this.companyService.delete(id).subscribe((res: any) => {
        this.loadCompanies();
      });
    }
  }
  

 
}
