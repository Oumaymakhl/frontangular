import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './shared/API_service/token.service';
import { CompanyService } from './shared/API_service/company.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, 
    private tokenService: TokenService,
    private companyService: CompanyService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("AuthGuard canActivate called");

    const user_id = this.tokenService.getUserId();
    console.log("User ID:", user_id);

    const companyId = route.paramMap.get('id'); // companyId est une chaîne de caractères
    console.log("Requested Company ID:", companyId);

    if (this.tokenService.loggedIn()) {
      try {
        const company = await this.companyService.getCompanyDetails(Number(companyId)).toPromise();
        console.log(company);
        if (company.admin_id === user_id) {
          return true;
        } else {
          console.log("User is not authorized to access this company.");
          this.router.navigate(['/login']);
          return false;
        }
      } catch (error) {
        console.error(error);
        this.router.navigate(['/login']);
        return false;
      }
    }

    return false;
  }
}