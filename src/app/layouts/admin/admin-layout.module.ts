import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminLayoutComponent} from "./admin-layout.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AdminCarComponent} from "../../modules/admin/admincar/admin-car.component";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminCarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class AdminLayoutModule { }
