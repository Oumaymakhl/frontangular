"use strict";(self.webpackChunkpd_pro_angularcli=self.webpackChunkpd_pro_angularcli||[]).push([[91],{12091:function(M,s,a){a.r(s),a.d(s,{UserModule:function(){return y}});var p=a(43144),c=a(15671),m=a(52297),f=a(69808),u=a(93075),e=a(91891),d=a(81188),g=["profilePictureInput"];function h(r,l){1&r&&e._UZ(0,"img",28)}function v(r,l){if(1&r&&e._UZ(0,"img",29),2&r){var n=e.oxw();e.Q6J("src",n.userProfile.profile_photo,e.LSH)}}function P(r,l){if(1&r&&(e.TgZ(0,"div")(1,"div",1)(2,"div",17)(3,"div",18)(4,"label"),e._uU(5,"Company Name"),e.qZA(),e._UZ(6,"input",30),e.qZA()(),e.TgZ(7,"div",20)(8,"div",18)(9,"label"),e._uU(10,"Subdomain"),e.qZA(),e._UZ(11,"input",30),e.qZA()()(),e.TgZ(12,"div",1)(13,"div",31)(14,"div",18)(15,"label"),e._uU(16,"Address"),e.qZA(),e._UZ(17,"input",30),e.qZA(),e.TgZ(18,"div",18)(19,"label"),e._uU(20,"Logo:"),e.qZA(),e._UZ(21,"img",32),e.qZA()()()()),2&r){var n=e.oxw();e.xp6(6),e.Q6J("value",n.userProfile.company.nom),e.xp6(5),e.Q6J("value",n.userProfile.company.subdomaine),e.xp6(6),e.Q6J("value",n.userProfile.company.adresse),e.xp6(4),e.s9C("src",n.userProfile.company.logo,e.LSH)}}var C=[{path:"",children:[{path:"pages/user",component:function(){var r=function(){function l(n){(0,c.Z)(this,l),this.authService=n}return(0,p.Z)(l,[{key:"ngOnInit",value:function(){this.getProfile()}},{key:"getProfile",value:function(){var o=this;this.authService.getProfile().subscribe(function(i){o.userProfile=i.profile,console.log(o.userProfile)},function(i){console.log("Error:",i)})}},{key:"selectProfilePicture",value:function(){this.profilePictureInput.nativeElement.click()}},{key:"uploadProfilePicture",value:function(o){var i=this;this.selectedFile=o.target.files.item(0),this.selectedFile&&this.authService.uploadProfilePhoto(this.selectedFile).subscribe(function(t){console.log("Photo uploaded successfully:",t),t.profile.profile_photo&&(i.userProfile.profile_photo=t.profile.profile_photo)},function(t){console.error("Error uploading photo:",t)})}},{key:"updateProfile",value:function(){this.authService.updateProfile({nom:this.userProfile.nom,prenom:this.userProfile.prenom,login:this.userProfile.login,email:this.userProfile.email}).subscribe({next:function(t){console.log(t),alert(t.message)},error:function(t){console.error("Error updating profile",t)}})}}]),l}();return r.\u0275fac=function(n){return new(n||r)(e.Y36(d.e))},r.\u0275cmp=e.Xpm({type:r,selectors:[["user-cmp"]],viewQuery:function(n,o){var i;1&n&&e.Gf(g,5),2&n&&e.iGM(i=e.CRH())&&(o.profilePictureInput=i.first)},decls:48,vars:8,consts:[[1,"main-content"],[1,"row"],[1,"col-md-4"],[1,"card","card-user"],[1,"author"],[1,"profile-picture-placeholder",2,"margin-top","80px",3,"click"],["src","./assets/img/avatar.png","alt","","class","avatar",4,"ngIf"],["alt","Profile Picture","class","profile-picture",3,"src",4,"ngIf"],["type","file","accept","image/*",2,"display","none",3,"change"],["profilePictureInput",""],[1,"title"],[1,"col-md-8"],[1,"card"],[1,"card-header"],[1,"card-body"],[3,"ngSubmit"],["profileForm","ngForm"],[1,"col-md-6","pr-1"],[1,"form-group"],["type","text","name","prenom","placeholder","First Name","required","",1,"form-control",3,"ngModel","ngModelChange"],[1,"col-md-6","pl-1"],["type","text","name","nom","placeholder","Last Name","required","",1,"form-control",3,"ngModel","ngModelChange"],["type","text","name","login","placeholder","Username","required","",1,"form-control",3,"ngModel","ngModelChange"],["for","exampleInputEmail1"],["type","email","name","email","placeholder","Email","required","",1,"form-control",3,"ngModel","ngModelChange"],["type","button",1,"btn","btn-primary",3,"click"],[4,"ngIf"],["type","submit",1,"btn","btn-primary"],["src","./assets/img/avatar.png","alt","",1,"avatar"],["alt","Profile Picture",1,"profile-picture",3,"src"],["type","text","disabled","",1,"form-control",3,"value"],[1,"col-md-12"],["alt","Logo de l'entreprise","width","100","height","100",3,"src"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),e.NdJ("click",function(){return o.selectProfilePicture()}),e.YNc(6,h,1,0,"img",6),e.YNc(7,v,1,1,"img",7),e.TgZ(8,"input",8,9),e.NdJ("change",function(t){return o.uploadProfilePicture(t)}),e.qZA()(),e.TgZ(10,"h5",10),e._uU(11),e.qZA()()()(),e.TgZ(12,"div",11)(13,"div",12)(14,"div",13)(15,"h5",10),e._uU(16,"Edit Profile"),e.qZA()(),e.TgZ(17,"div",14)(18,"form",15,16),e.NdJ("ngSubmit",function(){return o.updateProfile()}),e.TgZ(20,"div",1)(21,"div",17)(22,"div",18)(23,"label"),e._uU(24,"First Name"),e.qZA(),e.TgZ(25,"input",19),e.NdJ("ngModelChange",function(t){return o.userProfile.prenom=t}),e.qZA()()(),e.TgZ(26,"div",20)(27,"div",18)(28,"label"),e._uU(29,"Last Name"),e.qZA(),e.TgZ(30,"input",21),e.NdJ("ngModelChange",function(t){return o.userProfile.nom=t}),e.qZA()()()(),e.TgZ(31,"div",1)(32,"div",17)(33,"div",18)(34,"label"),e._uU(35,"Username"),e.qZA(),e.TgZ(36,"input",22),e.NdJ("ngModelChange",function(t){return o.userProfile.login=t}),e.qZA()()(),e.TgZ(37,"div",20)(38,"div",18)(39,"label",23),e._uU(40,"Email address"),e.qZA(),e.TgZ(41,"input",24),e.NdJ("ngModelChange",function(t){return o.userProfile.email=t}),e.qZA()()()(),e.TgZ(42,"div",18)(43,"button",25),e.NdJ("click",function(){return o.selectProfilePicture()}),e._uU(44,"Change Profile Picture"),e.qZA()(),e.YNc(45,P,22,4,"div",26),e.TgZ(46,"button",27),e._uU(47,"Update Profile"),e.qZA()()()()()()()),2&n&&(e.xp6(6),e.Q6J("ngIf",!(null!=o.userProfile&&o.userProfile.profile_photo)),e.xp6(1),e.Q6J("ngIf",null==o.userProfile?null:o.userProfile.profile_photo),e.xp6(4),e.Oqu(null==o.userProfile?null:o.userProfile.nom),e.xp6(14),e.Q6J("ngModel",o.userProfile.prenom),e.xp6(5),e.Q6J("ngModel",o.userProfile.nom),e.xp6(6),e.Q6J("ngModel",o.userProfile.login),e.xp6(5),e.Q6J("ngModel",o.userProfile.email),e.xp6(4),e.Q6J("ngIf",o.userProfile.company))},directives:[f.O5,u._Y,u.JL,u.F,u.Fj,u.Q7,u.JJ,u.On],styles:['.main-content[_ngcontent-%COMP%]{padding:20px;background:linear-gradient(135deg,#e8eef1,#e2e2f0)}.card-user[_ngcontent-%COMP%]   .author[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin-top:50px}.profile-picture-placeholder[_ngcontent-%COMP%]{width:220px;height:220px;border-radius:50%;border:3px dashed #1f0d97;display:flex;justify-content:center;align-items:center;cursor:pointer;overflow:hidden;margin-bottom:20px;margin-top:40px;position:relative}.profile-picture-placeholder[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:14px;color:#666;text-align:center}.avatar[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;object-fit:cover}.author[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{margin-top:30px;font-size:28px;color:#333;text-align:center;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;text-shadow:2px 2px 2px rgba(0,0,0,.2)}']}),r}()}]}],U=a(40520),_=a(55041),y=function(){var r=(0,p.Z)(function l(){(0,c.Z)(this,l)});return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=e.oAB({type:r,bootstrap:[_.y]}),r.\u0275inj=e.cJS({providers:[d.e],imports:[[f.ez,m.Bz.forChild(C),u.UX,U.JF,u.u5]]}),r}()}}]);