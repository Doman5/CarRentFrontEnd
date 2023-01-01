import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminCategoryDto} from "../model/admin-category-dto";

@Injectable({
  providedIn: 'root'
})
export class FormTypeService {

  constructor(private http: HttpClient) { }

  getTypes():  Observable<Array<string>> {
    return this.http.get<Array<string>>("/api/admin/cars/body-types");
  }
}
