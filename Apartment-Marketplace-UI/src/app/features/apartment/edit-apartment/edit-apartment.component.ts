import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { UpdateApartmentRequest } from '../models/update-apartment-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Apartment } from '../models/apartment.model';
@Component({
  selector: 'app-edit-apartment',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './edit-apartment.component.html',
  styleUrl: './edit-apartment.component.css'
})
export class EditApartmentComponent {
  @Input() apartmentId: string | null = null;
  @Output() apartmentUpdated = new EventEmitter<void>();

  model: UpdateApartmentRequest = {
    Name: '',
    Rooms: 0,
    Price: 0,
    Description: ''
  };

  constructor(private apartmentService: ApartmentService) {}

  ngOnChanges() {
    if (this.apartmentId) {
      this.apartmentService.getApartmentById(this.apartmentId).subscribe({
        next: (apartment) => {
          this.model = {
            Name: apartment.name,
            Rooms: apartment.rooms,
            Price: apartment.price,
            Description: apartment.description,
          };
        },
        error: (error) => {
          console.log('Error fetching apartment details', error);
        }
      });
    }
  }

  onFormSubmit() {
    if (this.apartmentId) {
      this.apartmentService.updateApartment(this.apartmentId, this.model).subscribe({
        next: () => {
          console.log('Apartment updated successfully!');
          this.apartmentUpdated.emit();
        },
        error: () => {
          console.log('Error updating apartment.');
        },
      });
    }
  }
  editApartment(apartment: Apartment): void {
    const addApartmentComponent = document.querySelector('app-add-apartment') as any;
    if (addApartmentComponent) {
      addApartmentComponent.setEditApartment(apartment);
    }
  }
}
