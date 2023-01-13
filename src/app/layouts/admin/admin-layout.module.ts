import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminLayoutComponent} from "./admin-layout.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AdminCarComponent} from "../../modules/admin/admin-car/admin-car.component";
import {MaterialModule} from "../../shared/material.module";
import {AdminCarAddComponent} from "../../modules/admin/admin-car/admin-car-add/admin-car-add.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminCarUpdateComponent } from 'src/app/modules/admin/admin-car/admin-car-update/admin-car-update.component';
import { AdminConfirmDialogComponent } from 'src/app/modules/common/component/admin-confirm-dialog/admin-confirm-dialog.component';
import { AdminCategoryAddComponent } from 'src/app/modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryComponent } from 'src/app/modules/admin/admin-category/admin-category.component';
import { AdminCategoryUpdateComponent } from 'src/app/modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminLoginComponent } from 'src/app/modules/admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminCarComponent,
    AdminCarAddComponent,
    AdminCarUpdateComponent,
    AdminConfirmDialogComponent,
    AdminCategoryAddComponent,
    AdminCategoryComponent,
    AdminCategoryUpdateComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminLayoutModule { }
