import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarBasicInfo } from './model/car';
import { FiltrationDto } from './model/filtrationDto';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  constructor(private http: HttpClient) { }
  
  getCars():Observable<Array<CarBasicInfo>> {
    return this.http.get<Array<CarBasicInfo>>("/api/cars");
  }

  getCarsWithFilters(filtersUrl: string): Observable<Array<CarBasicInfo>> {
    return this.http.get<Array<CarBasicInfo>>("/api/cars?" + filtersUrl)
  }
  
  getFilters(): Observable<FiltrationDto> {
    return this.http.get<FiltrationDto>("/api/cars/filters")
  }
}
