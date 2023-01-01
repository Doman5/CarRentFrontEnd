import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AdminBasicInfo} from "./model/admin-basic-info";
import {HttpClient} from "@angular/common/http";
import {Page} from "../../common/model/page";

@Injectable({
  providedIn: 'root'
})
export class AdminCarService {

  constructor(private http: HttpClient) { }

  getCars(page: number, size: number): Observable<Page<AdminBasicInfo>> {
    return this.http.get<Page<AdminBasicInfo>>(`/api/admin/cars`);
  }
}
