import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InitRent } from './model/initRent';
import { RentCar } from './model/rentCar';
import { RentDateAndPlace } from './model/rentDateAndPlace';
import { RentDto } from './model/rentDto';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  
  constructor(private http: HttpClient) { }
  
  getRentCars(rentDateAndPlace: RentDateAndPlace, onlyAvailable: boolean, sortingType: string): Observable<Array<RentCar>> {
    let rentalDate = new Date(rentDateAndPlace.rentalDate);
    let returnDate = new Date(rentDateAndPlace.returnDate);
    
    return this.http.get<Array<RentCar>>(`/api/rent/cars?&rentalPlace=${rentDateAndPlace.rentalPlace}&rentalDate=${rentalDate.toISOString().replaceAll(":","%3A")}&returnPlace=${rentDateAndPlace.returnPlace}&returnDate=${returnDate.toISOString().replaceAll(":","%3A")}&onlyAvailable=${onlyAvailable}&sortedByPrice=${sortingType}`);
  }
  
  getInitData():Observable<InitRent> {
    return this.http.get<InitRent>("/api/rent/initData")
  }

  placeRent(rent: RentDto): Observable<any> {
    return this.http.post<any>("/api/rent", rent);
  }
}
