import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { UpdateApartmentRequest } from '../models/update-apartment-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Apartment } from '../models/apartment.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-apartment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-apartment.component.html',
  styleUrl: './edit-apartment.component.css',
})
export class EditApartmentComponent implements OnInit, OnDestroy{
  id: string | null = null;
  paramsSubscription?: Subscription;
  editApartmentSubscription?: Subscription;
  apartment?: Apartment;

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id'); //Name of the id variable, have to be the same as the last variable
        // inside the path of EditApartmentComponent in the app-routing.module.ts file!
        if (this.id) {
          // get the data from the API for this category Id
          this.apartmentService.getApartmentById(this.id).subscribe({
            next: (response) => {
              this.apartment = response;
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {
    const updateApartmentRequest: UpdateApartmentRequest = {
      Name: this.apartment?.name ?? '',
      Rooms: this.apartment?.rooms ?? 1,
      Price: this.apartment?.price ?? 1,
      Description: this.apartment?.description ?? '',
    };
    //pass the object to service
    if (this.id) {
      this.editApartmentSubscription = this.apartmentService
        .updateApartment(this.id, updateApartmentRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/apartments');
          },
        });
    }
  }
  ngOnDestroy(): void{
    this.paramsSubscription?.unsubscribe();
    this.editApartmentSubscription?.unsubscribe();
  }
}
