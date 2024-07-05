"use strict";(self.webpackChunkpd_pro_angularcli=self.webpackChunkpd_pro_angularcli||[]).push([[607],{33607:function(C,s,l){l.r(s),l.d(s,{DocumentModule:function(){return y}});var m=l(43144),p=l(15671),h=l(69808),g=l(52297),t=l(91891),f=l(40520),v=function(){var c=function(){function u(n){(0,p.Z)(this,u),this.http=n}return(0,m.Z)(u,[{key:"importDocument",value:function(e){var o=new FormData;return o.append("file",e),this.http.post("http://localhost:8000/api/import-document",o)}},{key:"exportDocument",value:function(e){return this.http.get("http://localhost:8000/api/export-document/".concat(e),{responseType:"blob"})}},{key:"signDocument",value:function(e){return this.http.post("http://localhost:8000/api/sign-document/".concat(e),{})}},{key:"downloadSignedDocument",value:function(e){return this.http.get("http://localhost:8000/api/download-signed-document/".concat(e),{responseType:"blob"})}},{key:"showDocuments",value:function(){return this.http.get("http://localhost:8000/api/show-documents")}},{key:"exportDocumentWithSign",value:function(e,o){var r=new FormData;return r.append("documentId",e.toString()),r.append("signature",o,o.name),this.http.post("http://localhost:8000/api/documents/export-with-signature",r,{responseType:"blob"})}},{key:"uploadSignature",value:function(e){var o=new FormData;return o.append("signature",e),this.http.post("http://localhost:8000/api/signatures/upload",o)}}]),u}();return c.\u0275fac=function(n){return new(n||c)(t.LFG(f.eN))},c.\u0275prov=t.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c}(),d=l(93075);function D(c,u){if(1&c){var n=t.EpF();t.TgZ(0,"tr",18),t.NdJ("click",function(){var i=t.CHM(n).$implicit;return t.oxw().selectDocument(i.id)}),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td",19)(4,"button",20),t.NdJ("click",function(){var i=t.CHM(n).$implicit;return t.oxw().exporterDocument(i.id,i.name)}),t._uU(5,"Export"),t.qZA(),t.TgZ(6,"button",20),t.NdJ("click",function(){var i=t.CHM(n).$implicit;return t.oxw().exporterDocumentAvecSignature(i.id,i.name)}),t._uU(7,"Export with Signature"),t.qZA()()()}if(2&c){var e=u.$implicit;t.xp6(2),t.Oqu(e.name)}}var x=[{path:"",children:[{path:"",component:function(){var c=function(){function u(n){(0,p.Z)(this,u),this.documentService=n,this.termeDeRecherche="",this.documents=[],this.selectedDocumentId=null,this.selectedSignature=null}return(0,m.Z)(u,[{key:"ngOnInit",value:function(){this.chargerDocuments()}},{key:"chargerDocuments",value:function(){var e=this;this.documentService.showDocuments().subscribe(function(o){e.documents=o},function(o){console.error("Erreur lors du chargement des documents :",o)})}},{key:"importerDocument",value:function(e){var o=this;this.documentService.importDocument(e.target.files[0]).subscribe(function(i){o.chargerDocuments()},function(i){console.error("Erreur lors de l'importation du document :",i)})}},{key:"importerDocumentAvecSign",value:function(e){this.selectedSignature=e.target.files[0]}},{key:"exporterDocument",value:function(e,o){this.documentService.exportDocument(e).subscribe(function(r){var i=window.URL.createObjectURL(r),a=document.createElement("a");a.href=i,a.download=o,document.body.appendChild(a),a.click(),window.URL.revokeObjectURL(i)},function(r){console.error("Erreur lors de l'exportation du document :",r)})}},{key:"exporterDocumentAvecSignature",value:function(e,o){this.selectedSignature?this.documentService.exportDocumentWithSign(e,this.selectedSignature).subscribe(function(r){var i=window.URL.createObjectURL(r),a=document.createElement("a");a.href=i,a.download="signed_".concat(o),document.body.appendChild(a),a.click(),window.URL.revokeObjectURL(i)},function(r){console.error("Erreur lors de l'exportation du document avec signature :",r)}):console.error("Veuillez d'abord importer une signature.")}},{key:"selectDocument",value:function(e){this.selectedDocumentId=e}},{key:"documentsFiltered",value:function(){var e=this;return this.documents.filter(function(o){return o.name.toLowerCase().includes(e.termeDeRecherche.toLowerCase())})}}]),u}();return c.\u0275fac=function(n){return new(n||c)(t.Y36(v))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-document"]],decls:35,vars:2,consts:[[1,"main-content",2,"width","80%","margin","20px auto","margin-top","70px"],[1,"row"],[1,"col-lg-12","col-md-12"],[1,"table-wrapper","mt-5"],[1,"card","shadow","rounded"],[1,"table-title","bg-custom-blue","text-light","p-4","rounded-top","d-flex","justify-content-between","align-items-center"],[1,"card-title","m-0"],[1,"d-flex","justify-content-between","align-items-center"],["type","text","placeholder","Rechercher un document",1,"form-control","mr-2",3,"ngModel","ngModelChange"],[1,"d-flex","justify-content-end"],["for","importFile",1,"boutton"],["id","importFile","type","file",1,"d-none",3,"change"],["for","importFileWithSign",1,"boutton"],["id","importFileWithSign","type","file",2,"display","none",3,"change"],[1,"card-body"],[1,"mt-4"],["id","documentTable","cellspacing","0","width","100%",1,"table","table-striped","table-bordered"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[1,"text-right"],[1,"bouton",3,"click"]],template:function(n,e){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h4",6),t._uU(7,"List of Documents"),t.qZA(),t.TgZ(8,"div",7)(9,"input",8),t.NdJ("ngModelChange",function(r){return e.termeDeRecherche=r}),t.qZA()()(),t.TgZ(10,"div",9)(11,"div",9)(12,"label",10),t._uU(13,"Import Document"),t.qZA(),t.TgZ(14,"input",11),t.NdJ("change",function(r){return e.importerDocument(r)}),t.qZA()(),t.TgZ(15,"label",12),t._uU(16,"Import Signature"),t.qZA(),t.TgZ(17,"input",13),t.NdJ("change",function(r){return e.importerDocumentAvecSign(r)}),t.qZA()(),t.TgZ(18,"div",14)(19,"div",15)(20,"table",16)(21,"thead")(22,"tr")(23,"th"),t._uU(24,"File Name"),t.qZA(),t.TgZ(25,"th"),t._uU(26,"Actions"),t.qZA()()(),t.TgZ(27,"tfoot")(28,"tr")(29,"th"),t._uU(30,"File Name"),t.qZA(),t.TgZ(31,"th"),t._uU(32,"Actions"),t.qZA()()(),t.TgZ(33,"tbody"),t.YNc(34,D,8,1,"tr",17),t.qZA()()()()()()()()()),2&n&&(t.xp6(9),t.Q6J("ngModel",e.termeDeRecherche),t.xp6(25),t.Q6J("ngForOf",e.documentsFiltered()))},directives:[d.Fj,d.JJ,d.On,h.sg],styles:[".bg-custom-blue[_ngcontent-%COMP%]{background-color:#036;color:#fff}.btn-warning[_ngcontent-%COMP%]{background-color:#ffc107!important;color:#212529!important;padding:5px 10px;border:none;border-radius:3px;cursor:pointer}.btn-warning[_ngcontent-%COMP%]:hover{background-color:#e0a800!important}.btn-primary[_ngcontent-%COMP%]{background-color:#007bff!important;color:#fff!important;padding:5px 10px;border:none;border-radius:3px;cursor:pointer}.btn-primary[_ngcontent-%COMP%]:hover{background-color:#0056b3!important}.bouton[_ngcontent-%COMP%]{display:inline-block;background-color:#719fee;border-radius:5px;border:none;color:#fff;text-align:center;font-size:16px;padding:5px 10px;width:auto;cursor:pointer}.boutton[_ngcontent-%COMP%]{display:inline-block;background-color:#719fee;border-radius:5px;border:none;color:#fff;text-align:center;font-size:16px;padding:5px 10px;width:auto;cursor:pointer;margin-top:20px}"]}),c}()}]}],y=function(){var c=(0,m.Z)(function u(){(0,p.Z)(this,u)});return c.\u0275fac=function(n){return new(n||c)},c.\u0275mod=t.oAB({type:c}),c.\u0275inj=t.cJS({imports:[[h.ez,g.Bz.forChild(x),d.u5]]}),c}()}}]);