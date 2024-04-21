import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'app/shared/API_service/company.service';

@Component({
  selector: 'app-modif-company',
  templateUrl: './modif-company.component.html',
  styleUrls: ['./modif-company.component.css']
})
export class ModifCompanyComponent implements OnInit {
  constructor( private route: ActivatedRoute,private companyService: CompanyService
  ) { }
  loading: boolean = true;
  company!:any;
  companyId:any;
  selectedFile: File | null = null;
  isAdmin: boolean = false;

 

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.companyService.getcompanie(this.companyId).subscribe(
      res => {
          console.log(res); 
          this.company=res.company
          this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false; 
      }
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFile = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  updateCompany() {
    var inputData = {
      nom:this.company.nom,
      subdomaine:this.company.subdomaine,
       logo:this.selectedFile,
      //logo:this.company.logo,
      adresse:this.company.adresse,

    }

    this.companyService.updatecompany(inputData, this.companyId).subscribe({
      next:(res:any) => {
        console.log(res);
        alert(res.message);
      }
    })
     }
    }
    
