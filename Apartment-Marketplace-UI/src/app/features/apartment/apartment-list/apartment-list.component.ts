import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Apartment } from '../models/apartment.model';
import { ApartmentService } from '../services/apartment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateApartmentRequest } from '../models/update-apartment-request.model';

@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css',
})
export class ApartmentListComponent implements OnInit, OnDestroy {
  editApartmentId: string | null = null;
  apartments$?: Observable<Apartment[]>;
  deleteApartmentSubscription: Subscription = new Subscription();
  getApartmentsSubscription: Subscription = new Subscription();
  rooms?: number;
  price: string = 'asc';

  constructor(private apartmentService: ApartmentService) {}
  ngOnDestroy(): void {
    this.deleteApartmentSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadApartments();
  }

  
  loadApartments(): void {
    this.apartments$ = this.apartmentService.getAllApartments(
      this.rooms,
      this.price
    );

    //Виводимо данні про об'єкт в консоль, щоб перевірити, чи інформація з API отримується коректно
    this.apartments$.subscribe((apartments) => {
      if (apartments.length) {
        console.log(apartments);
        //console.log(JSON.stringify(apartments, null, 2)); // null, 2 для форматування
      }
    });
  }
  onFilterChange(event: any): void {
    this.rooms = event.target.value;
    this.loadApartments();
  }

  editApartment(id: string): void {
    this.editApartmentId = id;
  }

  onApartmentUpdated(): void {
    this.editApartmentId = null;
    this.loadApartments();
  }

  onSortChange(event: any): void {
    this.price = event.target.value;
    this.loadApartments();
  }

  deleteApartment(id: string): void {
    this.deleteApartmentSubscription = this.apartmentService
      .deleteApartment(id)
      .subscribe({
        next: (response) => {
          this.loadApartments();
          return response;
        },
        error: (err) => {
          console.error('Error deleting apartment:', err);
        },
      });
  }
  applyFilters(): void {
    this.loadApartments();
  }
}
