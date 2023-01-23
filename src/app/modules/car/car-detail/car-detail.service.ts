import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car';
import { CarBasicInfo } from '../model/carBasicInfo';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  
  constructor(private http: HttpClient) { }
  
  getCar(slug: string):Observable<Car> {
    return this.http.get<Car>("/api/cars/" + slug);
  }
  
  getRecommendedCars(slug: string):Observable<Array<CarBasicInfo>> {
    return this.http.get<Array<CarBasicInfo>>(`/api/cars/${slug}/recommended`);
  }
}
