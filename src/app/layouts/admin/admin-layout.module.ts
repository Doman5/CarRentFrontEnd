import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminLayoutComponent} from "./admin-layout.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AdminCarComponent} from "../../modules/admin/admincar/admin-car.component";
import {MaterialModule} from "../../shared/material.module";
import {AdminCarAddComponent} from "../../modules/admin/admincar/admin-car-add/admin-car-add.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminCarUpdateComponent } from 'src/app/modules/admin/admincar/admin-car-update/admin-car-update.component';
import { AdminConfirmDialogComponent } from 'src/app/modules/common/component/admin-confirm-dialog/admin-confirm-dialog.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminCarComponent,
    AdminCarAddComponent,
    AdminCarUpdateComponent,
    AdminConfirmDialogComponent
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
