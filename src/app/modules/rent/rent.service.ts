import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentCar } from './model/rentCar';
import { RentDateAndPlace } from './model/rentDateAndPlace';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient) { }
  
  getRentCars(rentDateAndPlace: RentDateAndPlace, onlyAvailable: boolean): Observable<Array<RentCar>> {
    return this.http.get<Array<RentCar>>(`/api/rent/cars?&rentalPlace=${rentDateAndPlace.rentalPlace}&rentalDate=${rentDateAndPlace.rentalDate.toISOString().replaceAll(":","%3A")}&returnPlace=${rentDateAndPlace.retrunPlace}&returnDate=${rentDateAndPlace.retrunDate.toISOString().replaceAll(":","%3A")}&onlyAvailable=${onlyAvailable}&sortedByPrice=Malejaco`);
  }
}
