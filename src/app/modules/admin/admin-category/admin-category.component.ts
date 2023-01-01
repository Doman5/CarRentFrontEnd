import { Component, OnInit } from '@angular/core';
import { AdminCategoryService } from './admin-category.service';
import { AdminCategory } from './model/admin-category';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  constructor(private adminCategoryService: AdminCategoryService) {}
 
  ngOnInit(): void {
    this.getCategories();
  }
  
  displayedColumns: string[] = ["id", "name", "actions"];
  data: AdminCategory[] = []
  totalElements: number = 0;
  
  getCategories() {
    this.adminCategoryService.getCategories()
      .subscribe(data => this.data = data)
  }

  deleteCategory(category: AdminCategory) {
      
  }
}
