import { Routes } from "@angular/router";
import { Statistique1Component } from "./statistique1/statistique1.component";


export const Statistique1Routes: Routes = [{

    path: '',
    children: [ {
      path: '',
      component: Statistique1Component
  }]
}];