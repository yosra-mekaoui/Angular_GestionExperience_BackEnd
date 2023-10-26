import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  
  {path:'experience',  loadChildren:() =>import('./experience/experience.module').then(m=>m.ExperienceModule)

  }
  ,
  {path:'evenement',  loadChildren:() =>import('./evenement/evenement.module').then(m=>m.EvenementModule)

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
