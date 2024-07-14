import { ApartmentListComponent } from './../apartment-list/apartment-list.component';
import { ApartmentService } from '../services/apartment.service';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { AddApartmentRequest } from '../models/add-apartment-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpdateApartmentRequest } from '../models/update-apartment-request.model';

@Component({
  selector: 'app-add-apartment',
  standalone: true,
  imports:[
    FormsModule
  ],
  templateUrl: './add-apartment.component.html',
  styleUrl: './add-apartment.component.css'
})
export class AddApartmentComponent  implements OnDestroy{

  model: AddApartmentRequest;
  private addApartmentSubscription ?: Subscription;
  constructor(private apartmentService: ApartmentService, private router : Router){
    this.model = {
      Name: '',
      Rooms: 0,
      Price: 0,
      Description: ''
    };
  }

  onFormSubmit(){
    this.addApartmentSubscription = this.apartmentService.addApartment(this.model)
    .subscribe({
      next: (response) => {
        console.log('Request was done successfully!');
        this.router.navigateByUrl('/apartments')
      },
      error: (error) => {
        console.log('Bad request!');
      }
    });
  }

  ngOnDestroy(): void {
    this.addApartmentSubscription?.unsubscribe();
  }

}
