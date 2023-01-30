import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/model/page';
import { AdminUserBasicInfo } from './model/adminUserBasicInfo';
import { AdminUserDto } from './model/adminUserDto';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  
  constructor(private http: HttpClient) { }
  
  getUsers(pageIndex: number, pageSize: number): Observable<Page<AdminUserBasicInfo>> {
    return this.http.get<Page<AdminUserBasicInfo>>("/api/admin/users")
  }
  
  getUser(username: string): Observable<AdminUserDto> {
    return this.http.get<AdminUserDto>("/api/admin/users/" + username);
  }

  patchRoles(value: any, username: string): Observable<AdminUserDto> {
    return this.http.patch<AdminUserDto>("/api/admin/users/" + username, value);
  }
}
