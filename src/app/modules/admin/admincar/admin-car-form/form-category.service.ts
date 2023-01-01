import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as http from "http";
import {AdminCategoryDto} from "../model/admin-category-dto";

@Injectable({
  providedIn: 'root'
})
export class FormCategoryService {

  constructor(private http: HttpClient) { }

  getCategories():  Observable<Array<AdminCategoryDto>> {
    return this.http.get<Array<AdminCategoryDto>>("/api/admin/cars/categories");
  }
}
