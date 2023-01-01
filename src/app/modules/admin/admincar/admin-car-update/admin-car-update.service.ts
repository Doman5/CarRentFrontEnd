import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCarBasicInfo } from '../model/admin-basic-info';
import { AdminCarTechnicalSpecificationDto } from '../model/admin-car-technical-specification-dto';

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

  updateBasicInfo(id: number, carBasicInfo: AdminCarBasicInfo): Observable<AdminCarBasicInfo> {
    return this.http.put<AdminCarBasicInfo>(`/api/admin/cars/${id}/carBasicInfo`, carBasicInfo);
  }

  updateTechSpec(id: number, carTechSpec: AdminCarTechnicalSpecificationDto): Observable<AdminCarTechnicalSpecificationDto> {
    return this.http.put<AdminCarTechnicalSpecificationDto>(`/api/admin/cars/${id}/carTechnicalSpecification`, carTechSpec);
  }

}
