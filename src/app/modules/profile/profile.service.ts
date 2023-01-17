import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoDto } from './model/userInfoDto';
import { UserInfoEditDto } from './model/userInfoEditDto';
import { UserRentDto } from './model/userRentDto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(private http: HttpClient) { }
  
  getUserRents(): Observable<Array<UserRentDto>> {
    return this.http.get<Array<UserRentDto>>("/api/profile/rents");
  }
  
  getUserInfo(): Observable<UserInfoDto> {
    return this.http.get<UserInfoDto>("/api/profile/info")
  }
  
  editUser(userEdit: UserInfoEditDto): Observable<UserInfoDto> {
    return this.http.put<UserInfoDto>("/api/profile/info", userEdit);
  }
}
