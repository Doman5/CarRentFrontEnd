import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from "./layouts/default/default.component";
import {CarComponent} from "./modules/car/car.component";
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import { AdminCarComponent } from './modules/admin/admin-car/admin-car.component';
import { AdminCarUpdateComponent } from './modules/admin/admin-car/admin-car-update/admin-car-update.component';
import { AdminCategoryComponent } from './modules/admin/admin-category/admin-category.component';
import { AdminCategoryAddComponent } from './modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCarAddComponent } from './modules/admin/admin-car/admin-car-add/admin-car-add.component';
import { CarDetailComponent } from './modules/car/car-detail/car-detail.component';

const routes: Routes = [
  {
    path:'', component: DefaultComponent, children: [
      {path: '', component: CarComponent},
      {path: 'Auta-Do-Wynajmu', component: CarComponent},
      {path: ':slug', component: CarDetailComponent}
    ]
  },
  {
    path:'', component: AdminLayoutComponent, children: [
      {path: 'admin/cars', component: AdminCarComponent},
      {path: 'admin/cars/add', component: AdminCarAddComponent},
      {path: 'admin/cars/update/:id', component: AdminCarUpdateComponent},
      {path: 'admin/categories', component: AdminCategoryComponent},
      {path: 'admin/categories/add', component: AdminCategoryAddComponent},
      {path: 'admin/categories/update/:id', component: AdminCategoryUpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
