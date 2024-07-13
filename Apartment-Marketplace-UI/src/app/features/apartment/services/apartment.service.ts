import { UpdateApartmentRequest } from '../models/update-apartment-request.model';
import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment.model';
import { AddApartmentRequest } from '../models/add-apartment-request.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient) {}
  addApartment(model:AddApartmentRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/apartments`, model);
  }
  getAllApartments(): Observable<Apartment[]>{
    return this.http.get<Apartment[]>(`${environment.apiBaseUrl}/api/apartments`);
  }
  getApartmentById (id: string): Observable<Apartment>{
    return this.http.get<Apartment>(`${environment.apiBaseUrl}/api/apartments/${id}`);
  }
  updateApartment(id: string, updateApartmentRequest: UpdateApartmentRequest): Observable<Apartment> {
    return this.http.put<Apartment>(`${environment.apiBaseUrl}/api/apartments/${id}`, updateApartmentRequest);
  }
  deleteApartment(id: string): Observable<Apartment>{
    return this.http.delete<Apartment>(`${environment.apiBaseUrl}/api/apartments/${id}`)
  }
}
