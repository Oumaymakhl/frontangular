import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/API_service/auth.service';
import { CompanyDetails, CompanyService } from 'app/shared/API_service/company.service';
import { TokenService } from 'app/shared/API_service/token.service';
import { Company } from 'app/shared/model/company';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  companyId: number;
  company: Company;
  adminId: number;
  loading: boolean = true; 
  userId: number; // Déclarer la propriété userId

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private authService: TokenService
  ) { }
  ngOnInit(): void {
    this.companyId = +this.route.snapshot.paramMap.get('id');
    this.loading = true; // Initialiser loading à true

    if (this.authService.loggedIn()) {
      this.userId = this.authService.getUserId();
      // Vérifier si l'utilisateur est un administrateur
      if (this.authService.isAdmin()) {
        this.companyService.getCompanyDetails(this.companyId)
          .subscribe(
            (data: CompanyDetails) => {
              // Vérifier si l'administrateur est associé à l'entreprise
              if (data.company.admin_id === this.userId) {
                this.company = data.company;
                this.loading = false; // Mettre loading à false une fois les détails de l'entreprise chargés
              } else {
                // Rediriger vers une page d'erreur ou une autre page appropriée
                this.router.navigate(['/error']);
              }
            },
            (error) => {
              console.error('Error fetching company details:', error);
              // Rediriger vers une page d'erreur ou une autre page appropriée
              this.router.navigate(['/error']);
            }
          );
      } else {
        // Rediriger vers une page d'erreur ou une autre page appropriée
        this.router.navigate(['/error']);
      }
    } else {
      // Rediriger vers la page de connexion
      this.router.navigate(['/login']);
    }
}
  /*ngOnInit(): void {
    this.companyId = +this.route.snapshot.paramMap.get('id');

    if (this.authService.loggedIn()) {
      this.adminId = this.authService.getUserId();
      this.companyService.getCompanyDetails(this.companyId)
        .subscribe(
          (data: CompanyDetails) => {
            if (data.company.admin_id === this.adminId) {
              this.company = data.company;
              this.loading = false; // Mettre loading à false une fois les détails de l'entreprise chargés
            } else {
              // Rediriger vers une page d'erreur ou une autre page appropriée
              this.router.navigate(['/error']);
            }
          },
          (error) => {
            console.error('Error fetching company details:', error);
            // Rediriger vers une page d'erreur ou une autre page appropriée
            this.router.navigate(['/error']);
          }
        );
    } else {
      // Rediriger vers la page de connexion
      this.router.navigate(['/login']);
    }
  }*/
}