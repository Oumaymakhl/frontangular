
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'app/shared/API_service/admin.service';


@Component({
  selector: 'app-modif-admin',
  templateUrl: './modif-admin.component.html',
  styleUrls: ['./modif-admin.component.css']
})

export class ModifAdminComponent{
    constructor(private route:ActivatedRoute ,private adminservice:AdminService){}
    admin!:any;
    adminId:any;
    message: string | null = null;
    messageType: 'success' | 'danger' | null = null;

    ngOnInit() {
        this.adminId=this.route.snapshot.paramMap.get('id');
        this.adminservice.getAdmin(this.adminId).subscribe(res =>{
           console.log(res); 
           this.admin=res.admin
        })
      
    }

 updateAdmin(){
var inputData={
    nom:this.admin.nom,
    prenom:this.admin.prenom,
    login:this.admin.login,
    email:this.admin.email,
    company_id:this.admin.company_id,
}
this.adminservice.updateadmin(inputData,this.adminId).subscribe(
    (res: any) => {
        console.log(res, 'response');
        this.message = 'Admin updated successfully!';
        this.messageType = 'success';
      },
      (err: any) => {
        console.log(err.error.errors, 'errors');
        if (err.error.message === 'Admin already exists') {
          this.message = 'Admin already exists';
        } else if (err.error.message === 'Email or login already exists in other roles') {
          this.message = 'Email or login already exists in other roles';
        } else {
          this.message = 'Failed to update admin. Please check the form and try again.';
        }
        this.messageType = 'danger';
      }
    );
  }
}