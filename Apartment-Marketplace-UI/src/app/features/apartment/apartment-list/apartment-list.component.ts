import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.model';
import { ApartmentService } from '../services/apartment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css',
})
export class ApartmentListComponent implements OnInit {
  apartments$?: Observable<Apartment[]>;
  roomsFilter?: number;
  sortOption?: string;
  constructor(private apartmentService: ApartmentService) {}

  ngOnInit(): void {
    this.loadApartments();
  }
  loadApartments(): void {
    this.apartments$ = this.apartmentService.getAllApartments(
      this.roomsFilter,
      this.sortOption
    );
  }
  onFilterChange(event: any): void {
    this.roomsFilter = event.target.value;
    this.loadApartments();
  }

  onSortChange(event: any): void {
    this.sortOption = event.target.value;
    this.loadApartments();
  }

  deleteApartment(id: string): void {
    this.apartmentService.deleteApartment(id).subscribe(() => {
      this.loadApartments();
    });
  }
}
