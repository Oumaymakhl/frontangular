"use strict";(self.webpackChunkpd_pro_angularcli=self.webpackChunkpd_pro_angularcli||[]).push([[592],{41466:function(f,p,s){s.d(p,{l:function(){return _}});var d=s(15671),v=s(43144),h=s(91891),c=s(40520),_=function(){var u=function(){function o(r){(0,d.Z)(this,o),this.http=r}return(0,v.Z)(o,[{key:"saveadmin",value:function(t){return this.http.post("http://localhost:8000/api/admin/signup",t)}},{key:"getAdmins",value:function(){return this.http.get("http://localhost:8000/api/admin")}},{key:"delete",value:function(t){return this.http.delete("http://localhost:8000/api/admin/".concat(t))}},{key:"getAdmin",value:function(t){return this.http.get("http://localhost:8000/api/admin/".concat(t,"/edit"))}},{key:"updateadmin",value:function(t,a){return this.http.put("http://localhost:8000/api/admin/".concat(a),t)}}]),o}();return u.\u0275fac=function(r){return new(r||u)(h.LFG(c.eN))},u.\u0275prov=h.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u}()},88492:function(f,p,s){s.d(p,{M:function(){return r}});var d=s(15671),v=s(43144),h=s(40520),c=s(62843),_=s(70262),u=s(91891),o=s(7107),r=function(){var t=function(){function a(e,n){(0,d.Z)(this,a),this.http=e,this.tokenService=n,this.baseUrl="http://localhost:8000/api/decisions"}return(0,v.Z)(a,[{key:"getAuthHeaders",value:function(){var n=this.tokenService.get();return new h.WM({"Content-Type":"application/json",Authorization:"Bearer ".concat(n)})}},{key:"dislikeDecision",value:function(n){if(!this.tokenService.getUserId())return(0,c._)("User ID not found in token.");var l="".concat(this.baseUrl,"/").concat(n,"/dislike");return this.http.post(l,{},{headers:this.getAuthHeaders()}).pipe((0,_.K)(function(g){return(0,c._)(g)}))}},{key:"likeDecision",value:function(n){if(!this.tokenService.getUserId())return(0,c._)("User ID not found in token.");var l="".concat(this.baseUrl,"/").concat(n,"/like");return this.http.post(l,{},{headers:this.getAuthHeaders()}).pipe((0,_.K)(function(g){return(0,c._)(g)}))}},{key:"getDecisionsWithLikesAndDislikes",value:function(){return this.http.get(this.baseUrl,{headers:this.getAuthHeaders()})}},{key:"getDecisions",value:function(){return this.http.get(this.baseUrl,{headers:this.getAuthHeaders()})}},{key:"addDecision",value:function(n){return"admin"!==this.tokenService.getUserType()?(0,c._)("Only admins can add decisions."):this.http.post(this.baseUrl,n,{headers:this.getAuthHeaders()}).pipe((0,_.K)(function(l){return(0,c._)(l)}))}},{key:"getDecision",value:function(n){return this.http.get("".concat(this.baseUrl,"/").concat(n),{headers:this.getAuthHeaders()})}},{key:"updateDecision",value:function(n,i){return this.http.put("".concat(this.baseUrl,"/").concat(n),i,{headers:this.getAuthHeaders()}).pipe((0,_.K)(function(l){return(0,c._)(l)}))}},{key:"deleteDecision",value:function(n){return this.http.delete("".concat(this.baseUrl,"/").concat(n),{headers:this.getAuthHeaders()}).pipe((0,_.K)(function(i){return(0,c._)(i)}))}},{key:"getLikesForDecision",value:function(n){return this.http.get("".concat(this.baseUrl,"/").concat(n,"/likes"),{headers:this.getAuthHeaders()})}},{key:"getDislikesForDecision",value:function(n){return this.http.get("".concat(this.baseUrl,"/").concat(n,"/dislikes"),{headers:this.getAuthHeaders()})}},{key:"getAllLikes",value:function(){return this.http.get("http://localhost:8000/api/likes",{headers:this.getAuthHeaders()})}}]),a}();return t.\u0275fac=function(e){return new(e||t)(u.LFG(h.eN),u.LFG(o.B))},t.\u0275prov=u.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},45892:function(f,p,s){s.d(p,{E:function(){return r}});var d=s(15671),v=s(43144),h=s(40520),c=s(54004),_=s(70262),u=s(39646),o=s(91891),r=function(){var t=function(){function a(e){(0,d.Z)(this,a),this.http=e}return(0,v.Z)(a,[{key:"getparticipants",value:function(){return this.http.get("http://localhost:8000/api/user")}},{key:"delete",value:function(n){return this.http.delete("http://localhost:8000/api/user/".concat(n))}},{key:"getParticipant",value:function(n){return this.http.get("http://localhost:8000/api/user/".concat(n))}},{key:"updateparticipant",value:function(n,i){return this.http.put("http://localhost:8000/api/user/".concat(i),n)}},{key:"saveparticipant",value:function(n){return this.http.post("http://localhost:8000/api/user/signup",n)}},{key:"getUserNameById",value:function(n){return this.http.get("http://localhost:8000/api/users/".concat(n,"/name")).pipe((0,c.U)(function(i){return i.fullName}),(0,_.K)(function(i){return console.error("Error fetching user name:",i),(0,u.of)("Unknown User")}))}},{key:"getUsersByAdminCompanyId",value:function(){var i={headers:new h.WM({"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")})};return this.http.get("http://localhost:8000/api/admin/company/users",i).pipe((0,c.U)(function(l){return l.users}))}}]),a}();return t.\u0275fac=function(e){return new(e||t)(o.LFG(h.eN))},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},999:function(f,p,s){s.d(p,{M:function(){return u}});var d=s(15671),v=s(43144),h=s(40520),c=s(54004),_=s(91891),u=function(){var o=function(){function r(t){(0,d.Z)(this,r),this.http=t,this.baseUrl="http://localhost:8000/api"}return(0,v.Z)(r,[{key:"addTask",value:function(a){return this.http.post("".concat(this.baseUrl,"/tasks"),a)}},{key:"getTask",value:function(a){return this.http.get("".concat(this.baseUrl,"/tasks/").concat(a))}},{key:"updateTask",value:function(a,e){return this.http.put("".concat(this.baseUrl,"/tasks/").concat(a),e)}},{key:"deleteTask",value:function(a){return this.http.delete("".concat(this.baseUrl,"/tasks/").concat(a))}},{key:"getTasks",value:function(){return this.http.get("".concat(this.baseUrl,"/tasks"))}},{key:"updateTaskStatus",value:function(a,e){return this.http.patch("".concat(this.baseUrl,"/tasks/").concat(a,"/status"),{status:e})}},{key:"getUsersByAdminCompanyId",value:function(){var e={headers:new h.WM({"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")})};return this.http.get("".concat(this.baseUrl,"/admin/company/users"),e).pipe((0,c.U)(function(n){return n.users}))}}]),r}();return o.\u0275fac=function(t){return new(t||o)(_.LFG(h.eN))},o.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o}()}}]);