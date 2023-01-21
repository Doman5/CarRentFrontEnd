import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminCarDto} from "../model/admin-car-dto";
import { AdminCarPhotoDto } from '../model/admin-car-photo-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminCarAddService {

  constructor(private http: HttpClient) { }

  saveNewCar(car: AdminCarDto): Observable<AdminCarDto> {
    return this.http.post<AdminCarDto>("/api/admin/cars", car);
  }

  uploadImage(formData: FormData, carName: string): Observable<AdminCarPhotoDto> {
    return this.http.post<AdminCarPhotoDto>(`/api/admin/cars/upload-photo/${carName}`, formData);
  }

  deletePhoto(photoId: number):Observable<void> {
    return this.http.delete<void>("/api/admin/cars/carPhotos/" + photoId);
  }
}
