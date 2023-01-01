import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminCarAddService } from '../../admin-car/admin-car-add/admin-car-add.service';
import { AdminCategoryService } from '../admin-category.service';

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private adminCategoryService: AdminCategoryService,
    private router: Router,
    private snacBar: MatSnackBar,) {}

  categoryForm!: FormGroup;

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  submit() {
      this.adminCategoryService.addCategory(this.categoryForm.value)
        .subscribe({
          next: category => {
            this.router.navigate(["/admin/categories/update", category.id])
            .then(() => this.snacBar.open("Kategoria została zapisana", "", {duration:3000}))
          }
        })
  }
}
