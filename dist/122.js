"use strict";(self.webpackChunkpd_pro_angularcli=self.webpackChunkpd_pro_angularcli||[]).push([[122],{95122:function(F,f,n){n.r(f),n.d(f,{CalendarModule:function(){return B}});var m=n(43144),C=n(15671),h=n(52297),w=n(69808),g=n(93075),y=n(35226),M=n.n(y),Y=n(11796),o=n(91891),Z=[{path:"",children:[{path:"",component:function(){var a=function(){function l(){(0,C.Z)(this,l)}return(0,m.Z)(l,[{key:"ngOnInit",value:function(){var i=$("#fullCalendar"),d=new Date,e=d.getFullYear(),t=d.getMonth(),r=d.getDate();i.fullCalendar({viewRender:function(c,u){if("month"!=c.name){var p=$(u).find(".fc-scroller")[0];new Y.Z(p)}},header:{left:"title",center:"month, agendaWeek, agendaDay",right:"prev, next, today"},defaultDate:d,selectable:!0,selectHelper:!0,views:{month:{titleFormat:"MMMM YYYY"},week:{titleFormat:" MMMM D YYYY"},day:{titleFormat:"D MMM, YYYY"}},select:function(c,u){M().fire({title:"Create an Event",html:'<div class="form-group"><input class="form-control" placeholder="Event Title" id="input-field"></div>',showCancelButton:!0,customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger"},buttonsStyling:!1}).then(function(p){var D=$("#input-field").val();D&&i.fullCalendar("renderEvent",{title:D,start:c,end:u},!0),i.fullCalendar("unselect")})},editable:!0,eventLimit:!0,events:[{title:"All Day Event",start:new Date(e,t,1),className:"event-default"},{id:999,title:"Repeating Event",start:new Date(e,t,r-4,6,0),allDay:!1,className:"event-rose"},{id:999,title:"Repeating Event",start:new Date(e,t,r+3,6,0),allDay:!1,className:"event-rose"},{title:"Meeting",start:new Date(e,t,r-1,10,30),allDay:!1,className:"event-green"},{title:"Lunch",start:new Date(e,t,r+7,12,0),end:new Date(e,t,r+7,14,0),allDay:!1,className:"event-red"},{title:"Md-pro Launch",start:new Date(e,t,r-2,12,0),allDay:!0,className:"event-azure"},{title:"Birthday Party",start:new Date(e,t,r+1,19,0),end:new Date(e,t,r+1,22,30),allDay:!1,className:"event-azure"},{title:"Click for Creative Tim",start:new Date(e,t,21),end:new Date(e,t,22),url:"https://www.creative-tim.com/",className:"event-orange"},{title:"Click for Google",start:new Date(e,t,21),end:new Date(e,t,22),url:"https://www.creative-tim.com/",className:"event-orange"}]})}}]),l}();return a.\u0275fac=function(s){return new(s||a)},a.\u0275cmp=o.Xpm({type:a,selectors:[["calendar-cmp"]],decls:7,vars:0,consts:[[1,"main-content"],[1,"container-fluid"],[1,"row"],[1,"col-md-10","col-md-offset-1"],[1,"card","card-calendar"],[1,"card-content"],["id","fullCalendar"]],template:function(s,i){1&s&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),o._UZ(6,"div",6),o.qZA()()()()()())},encapsulation:2}),a}()}]}],B=function(){var a=(0,m.Z)(function l(){(0,C.Z)(this,l)});return a.\u0275fac=function(s){return new(s||a)},a.\u0275mod=o.oAB({type:a}),a.\u0275inj=o.cJS({imports:[[w.ez,h.Bz.forChild(Z),g.u5]]}),a}()}}]);