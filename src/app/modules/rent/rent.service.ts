import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InitRent } from './model/initRent';
import { RentCar } from './model/rentCar';
import { RentDateAndPlace } from './model/rentDateAndPlace';
import { RentDto } from './model/rentDto';
import { RentSummary } from './model/rentSummary';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  
  constructor(private http: HttpClient) { }
  
  getRentCars(rentDateAndPlace: RentDateAndPlace, onlyAvailable: boolean, sortingType: string): Observable<Array<RentCar>> {
    let rentalDate = this.addHours(rentDateAndPlace.rentalDate, 1);
    let returnDate = this.addHours(rentDateAndPlace.returnDate, 1);  
    return this.http.get<Array<RentCar>>(`/api/rent/cars?&rentalPlace=${rentDateAndPlace.rentalPlace}&rentalDate=${rentalDate.toISOString().replaceAll(":","%3A")}&returnPlace=${rentDateAndPlace.returnPlace}&returnDate=${returnDate.toISOString().replaceAll(":","%3A")}&onlyAvailable=${onlyAvailable}&sortedByPrice=${sortingType}`);
  }
  
  getInitData():Observable<InitRent> {
    return this.http.get<InitRent>("/api/rent/initData")
  }

  placeRent(rent: RentDto): Observable<RentSummary> {
    return this.http.post<RentSummary>("/api/rent", rent);
  }

  private addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  };
}
