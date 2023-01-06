import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  
  constructor(private http: HttpClient) { }
  
  getCar(slug: string):Observable<Car> {
    return this.http.get<Car>("/api/cars/" + slug);
  }

}
