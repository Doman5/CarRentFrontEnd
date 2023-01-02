import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../../common/service/admin-confirm-dialog.service';
import { AdminCategoryService } from './admin-category.service';
import { AdminCategory } from './model/admin-category';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>

  constructor(
    private adminCategoryService: AdminCategoryService,
    private adminConfirmDialogService: AdminConfirmDialogService
    ) {}
 
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
    this.adminConfirmDialogService.openConfirmDialog("Czy chcesz usunąć ten produkt?")
    .afterClosed()
    .subscribe(result => {
      if(result) {
        this.adminCategoryService.delete(category.id)
        .subscribe(() => {
          this.data.forEach((value, index) => {
            if(category == value) {
              this.data.splice(index, 1);
              this.table.renderRows();
            }
          })
        })
      }
    })
  }
}
