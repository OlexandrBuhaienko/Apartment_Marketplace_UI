import { CommonModule } from '@angular/common';
import { ApartmentListComponent } from './../apartment-list/apartment-list.component';
import { ApartmentService } from '../services/apartment.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { AddApartmentRequest } from '../models/add-apartment-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-apartment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-apartment.component.html',
  styleUrl: './add-apartment.component.css',
})
export class AddApartmentComponent implements OnDestroy {
  @Output() apartmentAdded = new EventEmitter<void>();

  model: AddApartmentRequest;
  private addApartmentSubscription?: Subscription;
  constructor(
    private apartmentService: ApartmentService,
    private router: Router
  ) {
    this.model = {
      Name: '',
      Rooms: 0,
      Price: 0,
      Description: '',
    };
  }

  onFormSubmit(form: NgForm) {
    if (form.valid) {
      this.addApartmentSubscription = this.apartmentService
        .addApartment(this.model)
        .subscribe({
          next: (response) => {
            console.log('Request was done successfully!');
            this.apartmentAdded.emit();
            form.reset();
          },
          error: (error) => {
            console.log('Bad request!');
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.addApartmentSubscription?.unsubscribe();
  }
}
