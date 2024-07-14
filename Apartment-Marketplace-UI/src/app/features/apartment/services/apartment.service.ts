import { UpdateApartmentRequest } from '../models/update-apartment-request.model';
import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment.model';
import { AddApartmentRequest } from '../models/add-apartment-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient) {}
  addApartment(model:AddApartmentRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/apartments`, model);
  }
  
  getAllApartments(rooms?: number, price: string = 'asc'): Observable<Apartment[]> {
    let params = new HttpParams();
    
    if (rooms != null) {
      params = params.append('rooms', rooms.toString());
    }

    if (price) {
      params = params.append('price', price);
    }
    return this.http.get<Apartment[]>(`${environment.apiBaseUrl}/apartments`, {params});
  }

  getApartmentById (id: string): Observable<Apartment>{
    return this.http.get<Apartment>(`${environment.apiBaseUrl}/apartments/${id}`);
  }
  updateApartment(id: string, updateApartmentRequest: UpdateApartmentRequest): Observable<Apartment> {
    return this.http.put<Apartment>(`${environment.apiBaseUrl}/apartments/${id}`, updateApartmentRequest);
  }
  deleteApartment(id: string): Observable<Apartment>{
    return this.http.delete<Apartment>(`${environment.apiBaseUrl}/apartments/${id}`);
  }
}
