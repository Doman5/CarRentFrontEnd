import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategory } from './model/admin-category';
import { AdminCategoryDto } from './model/admin-category-dto';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  
  constructor(private http: HttpClient) { }
  
  getCategories():Observable<Array<AdminCategory>> {
    return this.http.get<Array<AdminCategory>>("/api/admin/categories");
  }

  addCategory(category: AdminCategoryDto):Observable<AdminCategory> {
    return this.http.post<AdminCategory>("/api/admin/categories", category);
  }
}
