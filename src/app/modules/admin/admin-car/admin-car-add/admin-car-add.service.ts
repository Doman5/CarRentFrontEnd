import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminCarDto} from "../model/admin-car-dto";

@Injectable({
  providedIn: 'root'
})
export class AdminCarAddService {

  constructor(private http: HttpClient) { }

  saveNewCar(car: AdminCarDto): Observable<AdminCarDto> {
    return this.http.post<AdminCarDto>("/api/admin/cars", car);
  }
}
