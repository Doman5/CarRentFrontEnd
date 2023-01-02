import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCarBasicInfo } from '../model/admin-basic-info';
import { AdminCarPriceDto } from '../model/admin-car-price-dto';
import { AdminCarTechnicalSpecificationDto } from '../model/admin-car-technical-specification-dto';
import { AdminCategoryDto } from '../model/admin-category-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminCarUpdateService {
  
  constructor(private http: HttpClient) { }
  
  getBasicInfo(id: number): Observable<AdminCarBasicInfo> {
    return this.http.get<AdminCarBasicInfo>(`/api/admin/cars/${id}/carBasicInfo`);
  }
  
  getCarTechSpec(id: number): Observable<AdminCarTechnicalSpecificationDto> {
    return this.http.get<AdminCarTechnicalSpecificationDto>(`/api/admin/cars/${id}/carTechnicalSpecification`)
  }
  
  getCarPrices(id: number): Observable<AdminCarPriceDto> {
    return this.http.get<AdminCarPriceDto>(`/api/admin/cars/${id}/carPrice`)
  }
  
  getCategory(id: number): Observable<AdminCategoryDto> {
    return this.http.get<AdminCategoryDto>(`/api/admin/cars/${id}/category`)
  }
  
  updateBasicInfo(id: number, carBasicInfo: AdminCarBasicInfo): Observable<AdminCarBasicInfo> {
    return this.http.put<AdminCarBasicInfo>(`/api/admin/cars/${id}/carBasicInfo`, carBasicInfo);
  }
  
  updateTechSpec(id: number, carTechSpec: AdminCarTechnicalSpecificationDto): Observable<AdminCarTechnicalSpecificationDto> {
    return this.http.put<AdminCarTechnicalSpecificationDto>(`/api/admin/cars/${id}/carTechnicalSpecification`, carTechSpec);
  }
  
  updateCarPrice(id: number, carPrice: AdminCarPriceDto): Observable<AdminCarPriceDto> {
    return this.http.put<AdminCarPriceDto>(`/api/admin/cars/${id}/carPrice`, carPrice);
  }
  
  updateCarCategory(id: number, category: AdminCategoryDto):Observable<AdminCategoryDto> {
    return this.http.put<AdminCategoryDto>(`/api/admin/cars/${id}/category`,category);
  }

}