import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTable} from "@angular/material/table";
import {AdminCarBasicInfo} from "./model/admin-basic-info";
import {AdminCarService} from "./admin-car.service";
import {map, startWith, switchMap} from "rxjs";
import { AdminConfirmDialogService } from '../../common/service/admin-confirm-dialog.service';

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

  constructor(
    private adminCarService: AdminCarService,
    private adminConfirmDialogService: AdminConfirmDialogService
    ) {}

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
    this.adminConfirmDialogService.openConfirmDialog("Czy chcesz usunąć ten produkt?")
    .afterClosed()
    .subscribe(result => {
      if(result) {
        this.adminCarService.delete(car.id)
        .subscribe(() => {
          this.data.forEach((value, index) => {
            if(car == value) {
              this.data.splice(index, 1);
              this.table.renderRows();
            }
          })
        })
      }
    })
  }

}
