import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AdminCarBasicInfo} from "./model/admin-basic-info";
import {HttpClient} from "@angular/common/http";
import {Page} from "../../common/model/page";

@Injectable({
  providedIn: 'root'
})
export class AdminCarService {
  
  constructor(private http: HttpClient) { }
  
  getCars(page: number, size: number): Observable<Page<AdminCarBasicInfo>> {
    return this.http.get<Page<AdminCarBasicInfo>>(`/api/admin/cars`);
  }

  delete(id: number):Observable<void> {
    return this.http.delete<void>("/api/admin/cars/" + id)
  }
}
