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
import { RentComponent } from './modules/rent/rent.component';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { AdminAuthorizationGuard } from './modules/common/guard/adminAuthorizationGuard';

const routes: Routes = [
  {
    path:'', component: DefaultComponent, children: [
      {path: '', component: CarComponent},
      {path: 'panel-rezerwacyjny', component: RentComponent},
      {path: 'Auta-Do-Wynajmu', component: CarComponent},
      {path: ':slug', component: CarDetailComponent}
      
    ]
  },
  {
    path:'', component: AdminLayoutComponent, children: [
      {path: 'admin', component: AdminLayoutComponent},
      {path: 'admin/cars', component: AdminCarComponent},
      {path: 'admin/cars/add', component: AdminCarAddComponent},
      {path: 'admin/cars/update/:id', component: AdminCarUpdateComponent},
      {path: 'admin/categories', component: AdminCategoryComponent},
      {path: 'admin/categories/add', component: AdminCategoryAddComponent},
      {path: 'admin/categories/update/:id', component: AdminCategoryUpdateComponent},
      {path: 'admin/login', component: AdminLoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
