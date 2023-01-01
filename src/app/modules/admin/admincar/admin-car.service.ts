import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
<<<<<<< HEAD
import {AdminCarBasicInfo} from "./model/admin-basic-info";
=======
import {AdminBasicInfo} from "./model/admin-basic-info";
>>>>>>> d3405cd59b7dbe8099f80bfc3b4fac2588cc0c4c
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
}
