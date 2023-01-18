import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { map, startWith, switchMap } from 'rxjs';
import { AdminRentService } from './admin-rent.service';
import { AdminRentDto } from './model/adminRentDto';

@Component({
  selector: 'app-admin-rent',
  templateUrl: './admin-rent.component.html',
  styleUrls: ['./admin-rent.component.css']
})
export class AdminRentComponent implements AfterViewInit {
 
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatTable) table!: MatTable<any>
  data: AdminRentDto[] = []
  displayedColumns: string[] = ['id', 'car', 'paymentType', 'status','rentalDate', 'returnDate', 'grossValue', 'actions'];
  totalElements: number = 0;

  constructor(
    private adminRentService: AdminRentService,
  ) {}
 
  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminRentService.getRents(this.paginator.pageIndex, this.paginator.pageSize)
      }),
      map(data => {
        this.totalElements = data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.data = data)
  }
}
