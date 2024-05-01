
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
this.adminservice.updateadmin(inputData,this.adminId).subscribe({
    next:(res:any)=>{
        console.log(res);
        alert(res.message);
    }
})
 }
}
