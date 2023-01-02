import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminCategoryService } from '../admin-category.service';
import { AdminCategoryDto } from '../model/admin-category-dto';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.css']
})
export class AdminCategoryUpdateComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private adminCategoryService: AdminCategoryService,
    private snacBar: MatSnackBar,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  getCategory() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCategoryService.getCategory(id)
      .subscribe(category => this.mapToCategoryFormValue(category))
  }

  mapToCategoryFormValue(category: AdminCategoryDto): void {
    this.categoryForm.setValue({
      name: category.name
    });
  }

  submit() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCategoryService.updateCategory(id, {
      name: this.categoryForm.get('name')?.value
    } as AdminCategoryDto).subscribe({
      next: category => {
        this.mapToCategoryFormValue(category);
        this.snacBar.open("Edytowano kategorie", "", {duration:3000})
      }
    })
  }

}
