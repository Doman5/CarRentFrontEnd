import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminFullRentInfo } from './model/adminFullIRentInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminRentUpdateService {
  constructor(private http: HttpClient) { }
  
  getStatuses():Observable<Array<string>> {
    return this.http.get<Array<string>>("/api/admin/rents/statuses");
  }
  
  getRent(id: number):Observable<AdminFullRentInfo> {
    return this.http.get<AdminFullRentInfo>("/api/admin/rents/" + id)
  }
  
  changeStatus(id: number, value: string): Observable<void> {
    return this.http.patch<void>(`/api/admin/rents/${id}`, value)
  }
}
