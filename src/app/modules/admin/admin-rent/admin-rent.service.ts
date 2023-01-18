import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/model/page';
import { AdminRentDto } from './model/adminRentDto';

@Injectable({
  providedIn: 'root'
})
export class AdminRentService {
  
  constructor(private http: HttpClient) { }
  
  getRents(pageIndex: number, pageSize: number): Observable<Page<AdminRentDto>>{
    return this.http.get<Page<AdminRentDto>>(`/api/admin/rents`);
  }
}
