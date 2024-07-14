import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { UpdateApartmentRequest } from '../models/update-apartment-request.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Apartment } from '../models/apartment.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-apartment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-apartment.component.html',
  styleUrl: './edit-apartment.component.css',
})
export class EditApartmentComponent implements OnInit, OnDestroy {
  @Input() apartmentId: string | null = null;
  @Output() editCompleted = new EventEmitter<void>();
  editApartmentSubscription?: Subscription;
  getApartmentSubscription?: Subscription;
  apartment?: Apartment;

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit(): void {
    if (this.apartmentId) {
    }
    if (this.apartmentId) {
      console.log('Fetching apartment data for ID:', this.apartmentId);
      // get the data from the API for this category Id
      this.getApartmentSubscription = this.apartmentService
        .getApartmentById(this.apartmentId)
        .subscribe({
          next: (response) => {
            this.apartment = response;
          },
        });
    }
  }

  onFormSubmit(form: NgForm): void {
    if (!this.apartment) return;
    const updateApartmentRequest: UpdateApartmentRequest = {
      Name: this.apartment?.name ?? '',
      Rooms: this.apartment?.rooms ?? 1,
      Price: this.apartment?.price ?? 1,
      Description: this.apartment?.description ?? '',
    };
    //pass the object to service
    if (this.apartmentId) {
      this.editApartmentSubscription = this.apartmentService
        .updateApartment(this.apartmentId, updateApartmentRequest)
        .subscribe({
          next: (response) => {
            this.editCompleted.emit();
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.editApartmentSubscription?.unsubscribe();
    this.getApartmentSubscription?.unsubscribe();
  }
}
