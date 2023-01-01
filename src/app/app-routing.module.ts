import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from "./layouts/default/default.component";
import {CarComponent} from "./modules/car/car.component";
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {AdminCarComponent} from "./modules/admin/admincar/admin-car.component";
import {AdminCarAddComponent} from "./modules/admin/admincar/admin-car-add/admin-car-add.component";

const routes: Routes = [
  {
    path:'', component: DefaultComponent, children: [
      {path: '', component: CarComponent},
      {path: 'Auta-Do-Wynajmu', component: CarComponent}
    ]
  },
  {
    path:'admin', component: AdminLayoutComponent, children: [
      {path: 'cars', component: AdminCarComponent},
      {path: 'cars/add', component: AdminCarAddComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
