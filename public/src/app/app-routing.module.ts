import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path: '', redirectTo: 'pets', pathMatch: 'full'},
  
  { path: 'pets', component: HomeComponent },
  { path: 'pets/new', component: CreateComponent },
  { path: 'pets/:id', component: DetailsComponent },
  { path: 'pets/edit/:id', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
