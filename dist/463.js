"use strict";(self.webpackChunkpd_pro_angularcli=self.webpackChunkpd_pro_angularcli||[]).push([[463],{26463:function(S,C,p){p.r(C),p.d(C,{CompanyRoutingModule:function(){return I}});var c=p(43144),m=p(15671),s=p(52297),n=p(91891),g=p(59993),l=p(93075),u=p(69808),v=function(a){return["/companies/list/modif",a]};function y(o,a){if(1&o){var t=n.EpF();n.TgZ(0,"tr")(1,"td"),n._uU(2),n.qZA(),n.TgZ(3,"td"),n._uU(4),n.qZA(),n.TgZ(5,"td"),n._UZ(6,"img",13),n.qZA(),n.TgZ(7,"td"),n._uU(8),n.qZA(),n.TgZ(9,"td",14)(10,"a",15),n._UZ(11,"i",16),n.qZA(),n.TgZ(12,"button",17),n.NdJ("click",function(r){var f=n.CHM(t).$implicit;return n.oxw().deleteCompany(r,f.id)}),n._UZ(13,"i",18),n.qZA()()()}if(2&o){var e=a.$implicit;n.xp6(2),n.Oqu(e.nom),n.xp6(2),n.Oqu(e.subdomaine),n.xp6(2),n.Q6J("src",e.logo,n.LSH),n.xp6(2),n.Oqu(e.adresse),n.xp6(2),n.Q6J("routerLink",n.VKq(5,v,e.id))}}function _(o,a){1&o&&(n.TgZ(0,"tr")(1,"td",19),n._uU(2,"Aucune entreprise trouv\xe9e"),n.qZA()())}var h=function(){var o=function(){function a(t,e){(0,m.Z)(this,a),this.companyService=t,this.router=e,this.searchTerm=""}return(0,c.Z)(a,[{key:"ngOnInit",value:function(){this.loadCompanies()}},{key:"loadCompanies",value:function(){var e=this;this.companyService.getCompany().subscribe(function(i){e.companies=i.companies,console.log(i)},function(i){console.error("Error loading companies:",i)})}},{key:"deleteCompany",value:function(e,i){var r=this;confirm("Are you sure you want to delete this company?")&&(e.target.innerText="Deleting",this.companyService.delete(i).subscribe(function(d){r.loadCompanies()}))}},{key:"ajouterCompany",value:function(){this.router.navigate(["/companies/list/ajout"])}},{key:"filteredCompanies",value:function(){var e=this;return this.companies.filter(function(i){return i.nom.toLowerCase().includes(e.searchTerm.toLowerCase())||i.adresse.toLowerCase().includes(e.searchTerm.toLowerCase())})}}]),a}();return o.\u0275fac=function(t){return new(t||o)(n.Y36(g.J),n.Y36(s.F0))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-company-list"]],decls:31,vars:3,consts:[[1,"container-xl","mt-5","mb-4"],[1,"table-responsive"],[1,"table-wrapper","mt-5"],[1,"table","table-bordered","shadow","rounded"],["colspan","8"],[1,"table-title","bg-custom-blue","text-light","p-4","rounded-top","d-flex","justify-content-between","align-items-center"],[1,"m-0"],[1,"d-flex","align-items-center"],["type","text","placeholder","Search by name",1,"form-control","custom-width","mr-2",3,"ngModel","ngModelChange"],[1,"table","table-striped","table-hover"],[1,"bg-white","text-dark"],[4,"ngFor","ngForOf"],[4,"ngIf"],["alt","Logo","width","50",3,"src"],[1,"text-right"],[1,"bouton",3,"routerLink"],[1,"fa","fa-edit"],["type","button",1,"bouton",3,"click"],[1,"fa","fa-times"],["colspan","6",1,"text-center"]],template:function(t,e){1&t&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"table",3)(4,"tbody")(5,"tr")(6,"td",4)(7,"div",5)(8,"h4",6)(9,"b"),n._uU(10,"List of companies"),n.qZA()(),n.TgZ(11,"div",7)(12,"input",8),n.NdJ("ngModelChange",function(r){return e.searchTerm=r}),n.qZA()()()()(),n.TgZ(13,"tr")(14,"td")(15,"table",9)(16,"thead",10)(17,"tr")(18,"th"),n._uU(19,"Name"),n.qZA(),n.TgZ(20,"th"),n._uU(21,"Subdomain"),n.qZA(),n.TgZ(22,"th"),n._uU(23,"Logo"),n.qZA(),n.TgZ(24,"th"),n._uU(25,"Address"),n.qZA(),n.TgZ(26,"th"),n._uU(27,"Actions"),n.qZA()()(),n.TgZ(28,"tbody"),n.YNc(29,y,14,7,"tr",11),n.YNc(30,_,3,0,"tr",12),n.qZA()()()()()()()()()),2&t&&(n.xp6(12),n.Q6J("ngModel",e.searchTerm),n.xp6(17),n.Q6J("ngForOf",e.filteredCompanies()),n.xp6(1),n.Q6J("ngIf",0===e.filteredCompanies().length))},directives:[l.Fj,l.JJ,l.On,u.sg,s.yS,u.O5],styles:[".table-responsive[_ngcontent-%COMP%]{overflow-x:auto}.table-wrapper[_ngcontent-%COMP%]{margin-top:20px}.table-bordered[_ngcontent-%COMP%]{border:1px solid #003366}.custom-width[_ngcontent-%COMP%]{width:100%}.table-title[_ngcontent-%COMP%]{background-color:#036;color:#fff;padding:20px;border-radius:10px}.table-title[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0}.table-title[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid #003366;border-radius:5px}.table-title[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#0069d9;color:#fff;border:none;border-radius:5px}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(odd){background-color:#f5f5f5}.table-hover[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:#e0e0e0}.btn-table[_ngcontent-%COMP%]{color:#fff;border:none;border-radius:5px}.btn-table[_ngcontent-%COMP%]:hover{opacity:.8}.bouton[_ngcontent-%COMP%]{display:inline-block;background-color:#719fee;border-radius:5px;border:none;color:#fff;text-align:center;font-size:16px;padding:5px 10px;width:auto;cursor:pointer}.bouton[_ngcontent-%COMP%] + .bouton[_ngcontent-%COMP%]{margin-left:10px}"]}),o}();function b(o,a){if(1&o){var t=n.EpF();n.TgZ(0,"div")(1,"div",12)(2,"div",13)(3,"label",14),n._uU(4,"Name"),n.TgZ(5,"span",15),n._uU(6,"*"),n.qZA()()(),n.TgZ(7,"div",16)(8,"input",17),n.NdJ("ngModelChange",function(r){return n.CHM(t),n.oxw().company.nom=r}),n.qZA()()(),n.TgZ(9,"div",12)(10,"div",13)(11,"label",14),n._uU(12,"Subdomain"),n.TgZ(13,"span",15),n._uU(14,"*"),n.qZA()()(),n.TgZ(15,"div",16)(16,"input",18),n.NdJ("ngModelChange",function(r){return n.CHM(t),n.oxw().company.subdomaine=r}),n.qZA()()(),n.TgZ(17,"div",12)(18,"div",13)(19,"label",14),n._UZ(20,"i",19),n._uU(21," Logo"),n.qZA()(),n.TgZ(22,"div",16)(23,"div",20)(24,"div",21)(25,"span",22),n._UZ(26,"i",19),n.qZA()(),n.TgZ(27,"input",23),n.NdJ("change",function(r){return n.CHM(t),n.oxw().onFileSelected(r)}),n.qZA()()()(),n.TgZ(28,"div",12)(29,"div",13)(30,"label",14),n._uU(31,"Address"),n.TgZ(32,"span",15),n._uU(33,"*"),n.qZA()()(),n.TgZ(34,"div",16)(35,"input",24),n.NdJ("ngModelChange",function(r){return n.CHM(t),n.oxw().company.adresse=r}),n.qZA()()()()}if(2&o){var e=n.oxw();n.xp6(8),n.Q6J("ngModel",e.company.nom),n.xp6(8),n.Q6J("ngModel",e.company.subdomaine),n.xp6(19),n.Q6J("ngModel",e.company.adresse)}}function Z(o,a){1&o&&(n.TgZ(0,"div",12)(1,"div",25)(2,"button",26),n._uU(3,"Update"),n.qZA()()())}var x=function(){var o=function(){function a(t,e){(0,m.Z)(this,a),this.route=t,this.companyService=e,this.loading=!0,this.selectedFile=null,this.isAdmin=!1}return(0,c.Z)(a,[{key:"ngOnInit",value:function(){var e=this;this.companyId=this.route.snapshot.paramMap.get("id"),this.companyService.getcompanie(this.companyId).subscribe(function(i){console.log(i),e.company=i.company,e.loading=!1},function(i){console.error(i),e.loading=!1})}},{key:"onFileSelected",value:function(e){var i=this,r=e.target.files[0];if(r){var d=new FileReader;d.onload=function(f){i.selectedFile=f.target.result},d.readAsDataURL(r)}}},{key:"updateCompany",value:function(){this.companyService.updatecompany({nom:this.company.nom,subdomaine:this.company.subdomaine,logo:this.selectedFile,adresse:this.company.adresse},this.companyId).subscribe({next:function(r){console.log(r),alert(r.message)}})}}]),a}();return o.\u0275fac=function(t){return new(t||o)(n.Y36(s.gz),n.Y36(g.J))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-modif-company"]],decls:15,vars:2,consts:[[1,"container-xl",2,"margin-top","80px","margin-bottom","100px"],[1,"table-wrapper","mt-5"],[1,"card","shadow"],[1,"table-title","bg-custom-blue","text-light","p-4","rounded-top","d-flex","justify-content-between","align-items-center"],[1,"mb-0"],[1,"col-auto"],["type","button","routerLink","/companies/list",1,"btn","btn-secondary"],[1,"card-body"],[3,"ngSubmit"],["f","ngForm"],[4,"ngIf"],["class","form-group p-10 row",4,"ngIf"],[1,"form-group","p-10","row"],[1,"col-sm-3"],[1,"p-t-b-10"],[1,"requiredStar"],[1,"col-sm-9"],["type","text","name","nom","required","",1,"form-control",3,"ngModel","ngModelChange"],["type","text","name","subdomaine","required","",1,"form-control",3,"ngModel","ngModelChange"],[1,"fas","fa-image","text-primary"],[1,"input-group"],[1,"input-group-prepend"],[1,"input-group-text","bg-white","border-right-0"],["type","file","name","logo",1,"form-control","border-left-0",3,"change"],["type","text","name","adresse","required","",1,"form-control",3,"ngModel","ngModelChange"],[1,"col-sm-12","text-center"],["type","submit",1,"bouton"]],template:function(t,e){1&t&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div")(5,"h4",4),n._uU(6,"Edit Company"),n.qZA()(),n.TgZ(7,"div",5)(8,"button",6),n._uU(9,"Back"),n.qZA()()(),n.TgZ(10,"div",7)(11,"form",8,9),n.NdJ("ngSubmit",function(){return e.updateCompany()}),n.YNc(13,b,36,3,"div",10),n.YNc(14,Z,4,0,"div",11),n.qZA()()()()()),2&t&&(n.xp6(13),n.Q6J("ngIf",!e.loading),n.xp6(1),n.Q6J("ngIf",!e.loading))},directives:[s.rH,l._Y,l.JL,l.F,u.O5,l.Fj,l.Q7,l.JJ,l.On],styles:[".bg-custom-blue[_ngcontent-%COMP%]{background-color:#036;color:#fff}.container-xl[_ngcontent-%COMP%]{width:60%;margin:50px auto 70px}.green-btn[_ngcontent-%COMP%]{background-color:#28a745;border-color:#28a745}.bouton[_ngcontent-%COMP%]{display:inline-block;background-color:#719fee;border-radius:5px;border:none;color:#fff;text-align:center;font-size:16px;padding:5px 10px;width:auto;cursor:pointer}"]}),o}(),M=p(7107);function T(o,a){1&o&&(n.TgZ(0,"div",5)(1,"span",6),n._uU(2,"Loading..."),n.qZA()())}function A(o,a){if(1&o&&n._UZ(0,"img",22),2&o){var t=n.oxw(3);n.Q6J("src",t.company.logo,n.LSH)}}function O(o,a){1&o&&(n.TgZ(0,"p"),n._uU(1,"No logo available"),n.qZA())}function q(o,a){if(1&o){var t=n.EpF();n.TgZ(0,"div")(1,"div",7)(2,"div",8)(3,"h5",9),n._uU(4,"Company Details"),n.qZA()(),n.TgZ(5,"div",10)(6,"div",11)(7,"div",12)(8,"div",13)(9,"label",14),n._uU(10,"Name:"),n.qZA(),n.TgZ(11,"input",15),n.NdJ("ngModelChange",function(r){return n.CHM(t),n.oxw(2).company.nom=r}),n.qZA()(),n.TgZ(12,"div",13)(13,"label",16),n._uU(14,"Subdomain:"),n.qZA(),n.TgZ(15,"input",17),n.NdJ("ngModelChange",function(r){return n.CHM(t),n.oxw(2).company.subdomaine=r}),n.qZA()(),n.TgZ(16,"div",13)(17,"label",18),n._uU(18,"Address:"),n.qZA(),n.TgZ(19,"textarea",19),n.NdJ("ngModelChange",function(r){return n.CHM(t),n.oxw(2).company.adresse=r}),n.qZA()()(),n.TgZ(20,"div",12)(21,"div",13)(22,"label",20),n._uU(23,"Logo:"),n.qZA(),n.YNc(24,A,1,1,"img",21),n.YNc(25,O,2,0,"p",4),n.qZA()()()()()()}if(2&o){var e=n.oxw(2);n.xp6(11),n.Q6J("ngModel",e.company.nom),n.xp6(4),n.Q6J("ngModel",e.company.subdomaine),n.xp6(4),n.Q6J("ngModel",e.company.adresse),n.xp6(5),n.Q6J("ngIf",e.company.logo),n.xp6(1),n.Q6J("ngIf",!e.company.logo)}}function J(o,a){if(1&o&&(n.TgZ(0,"div",1)(1,"div",2),n.YNc(2,T,3,0,"div",3),n.qZA(),n.YNc(3,q,26,5,"div",4),n.qZA()),2&o){var t=n.oxw();n.xp6(2),n.Q6J("ngIf",t.loading),n.xp6(1),n.Q6J("ngIf",t.company)}}var w=[{path:"list",component:h},{path:"list/modif/:id",component:x},{path:"details/:id",component:function(){var o=function(){function a(t,e,i,r){(0,m.Z)(this,a),this.route=t,this.router=e,this.companyService=i,this.authService=r,this.loading=!0}return(0,c.Z)(a,[{key:"ngOnInit",value:function(){var e=this;this.companyId=+this.route.snapshot.paramMap.get("id"),this.loading=!0,this.authService.loggedIn()?(this.userId=this.authService.getUserId(),this.authService.isAdmin()?this.companyService.getCompanyDetails(this.companyId).subscribe(function(i){i.company.admin_id===e.userId?(e.company=i.company,e.loading=!1):e.router.navigate(["/error"])},function(i){console.error("Error fetching company details:",i),e.router.navigate(["/error"])}):this.router.navigate(["/error"])):this.router.navigate(["/login"])}}]),a}();return o.\u0275fac=function(t){return new(t||o)(n.Y36(s.gz),n.Y36(s.F0),n.Y36(g.J),n.Y36(M.B))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-company-details"]],decls:1,vars:1,consts:[["class","container mt-5",4,"ngIf"],[1,"container","mt-5"],[1,"text-center"],["class","spinner-border text-primary","role","status",4,"ngIf"],[4,"ngIf"],["role","status",1,"spinner-border","text-primary"],[1,"visually-hidden"],[1,"card"],[1,"card-header"],[1,"card-title"],[1,"card-body"],[1,"row"],[1,"col-md-6"],[1,"form-group"],["for","name"],["type","text","id","name","disabled","",1,"form-control",3,"ngModel","ngModelChange"],["for","subdomain"],["type","text","id","subdomain","disabled","",1,"form-control",3,"ngModel","ngModelChange"],["for","address"],["id","address","disabled","",1,"form-control",3,"ngModel","ngModelChange"],["for","logo"],["class","img-fluid","alt","Company Logo",3,"src",4,"ngIf"],["alt","Company Logo",1,"img-fluid",3,"src"]],template:function(t,e){1&t&&n.YNc(0,J,4,2,"div",0),2&t&&n.Q6J("ngIf",e.company&&!e.loading)},directives:[u.O5,l.Fj,l.JJ,l.On],styles:[""]}),o}()}],I=function(){var o=(0,c.Z)(function a(){(0,m.Z)(this,a)});return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[[s.Bz.forChild(w)],s.Bz]}),o}()}}]);