import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminCarBasicInfo } from '../model/admin-basic-info';
import { AdminCarPhotoDto } from '../model/admin-car-photo-dto';
import { AdminCarPriceDto } from '../model/admin-car-price-dto';
import { AdminCarTechnicalSpecificationDto } from '../model/admin-car-technical-specification-dto';
import { AdminCategoryDto } from '../model/admin-category-dto';
import { AdminDescriptionDto } from '../model/admin-description-dto';
import { AdminEquipmentDto } from '../model/admin-equipment-dto';

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
  
  uploadImage(formData: FormData, id: number): Observable<AdminCarPhotoDto> {
    return this.http.post<AdminCarPhotoDto>(`/api/admin/cars/${id}/upload-photo`, formData);
  }
  
  getCarPhotos(id: number): Observable<Array<AdminCarPhotoDto>> {
    return this.http.get<Array<AdminCarPhotoDto>>(`/api/admin/cars/${id}/carPhotos`);
  }
  
  deletePhoto(photoId: number):Observable<void> {
    return this.http.delete<void>("/api/admin/cars/carPhotos/" + photoId);
  }
  
  getDescriptions(id: number): Observable<Array<AdminDescriptionDto>> {
    return this.http.get<Array<AdminDescriptionDto>>(`/api/admin/cars/${id}/carDescription`);
  }
  
  updateDescriptions(value: any, id: number):Observable<Array<AdminDescriptionDto>> {
    console.log(value);
    return this.http.put<Array<AdminDescriptionDto>>(`/api/admin/cars/${id}/carDescription`,value)
  }

  getEquipments(id: number): Observable<Array<AdminEquipmentDto>> {
    return this.http.get<Array<AdminEquipmentDto>>(`/api/admin/cars/${id}/carEquipment`);
  }
  updateEquipment(value: any, id: number): Observable<Array<AdminEquipmentDto>> {
    return this.http.put<Array<AdminEquipmentDto>>(`/api/admin/cars/${id}/carEquipment`, value);
  }
}
