import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { map, startWith, switchMap } from 'rxjs';
import { AdminUsersService } from './admin-users.service';
import { AdminUserBasicInfo } from './model/adminUserBasicInfo';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatTable) table!: MatTable<any>
  data!: AdminUserBasicInfo[];
  displayedColumns = ['username', 'firstName', 'lastName', 'roles', 'actions']
  totalElements = 0;

  constructor(private adminUsersService: AdminUsersService) {}

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminUsersService.getUsers(this.paginator.pageIndex, this.paginator.pageSize)
      }),
      map(data => {
        this.totalElements = data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.data = data)
  }

}
