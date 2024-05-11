import { Routes } from "@angular/router";
import { StatistiqueComponent } from "./statistique/statistique.component";


export const StatistiqueRoutes: Routes = [{

    path: '',
    children: [ {
      path: '',
      component: StatistiqueComponent
  }]
}];