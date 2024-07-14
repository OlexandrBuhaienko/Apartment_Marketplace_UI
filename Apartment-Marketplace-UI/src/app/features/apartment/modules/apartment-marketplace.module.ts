import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentListComponent } from '../apartment-list/apartment-list.component';
import { AddApartmentComponent } from '../add-apartment/add-apartment.component';
import { EditApartmentComponent } from '../edit-apartment/edit-apartment.component';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ApartmentListComponent,
    AddApartmentComponent,
    EditApartmentComponent,
  ],
  exports: [
    ApartmentListComponent,
    AddApartmentComponent,
    EditApartmentComponent,
  ]
})
export class ApartmentMarketplaceModule { }
