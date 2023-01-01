import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTable} from "@angular/material/table";
<<<<<<< HEAD
import {AdminCarBasicInfo} from "./model/admin-basic-info";
=======
import {AdminBasicInfo} from "./model/admin-basic-info";
>>>>>>> d3405cd59b7dbe8099f80bfc3b4fac2588cc0c4c
import {AdminCarService} from "./admin-car.service";
import {map, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-admin-car',
  templateUrl: './admin-car.component.html',
  styleUrls: ['./admin-car.component.css']
})
export class AdminCarComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatTable) table!: MatTable<any>
  displayedColumns: string[] = ["id", "brand", "model", "year", "type", "actions"];
  data: AdminCarBasicInfo[] = []
  totalElements: number = 0;

  constructor(private adminCarService: AdminCarService) {}

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminCarService.getCars(this.paginator.pageIndex, this.paginator.pageSize)
      }),
      map(data => {
        this.totalElements = data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.data = data)
  }


  confirmDelete(car: AdminCarBasicInfo) {

  }

}
