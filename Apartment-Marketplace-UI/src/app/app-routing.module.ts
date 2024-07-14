import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentListComponent } from './features/apartment/apartment-list/apartment-list.component';
import { EditApartmentComponent } from './features/apartment/edit-apartment/edit-apartment.component';
import { AddApartmentComponent } from './features/apartment/add-apartment/add-apartment.component';

const routes: Routes = [
  { path: '', redirectTo: 'apartments', pathMatch: 'full' },
  { path: 'apartments', component: ApartmentListComponent },
  {
    path: 'apartments/add',
    component: AddApartmentComponent
  }, 
  {
    path: 'apartments/:id',
    component: EditApartmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
