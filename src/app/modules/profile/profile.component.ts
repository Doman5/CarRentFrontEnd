import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfoDto } from './model/userInfoDto';
import { UserRentDto } from './model/userRentDto';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  userRents!: UserRentDto[];
  userInfo!: UserInfoDto;
  userForm!: FormGroup;
  passwordForm!: FormGroup;
  checkPassword = false;
  canEditUser = false;
  passwordError = false;


  
  constructor(private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private snacBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getUserRents();
    this.getUserInfo();
    this.userForm = this.formBuilder.group({
      username:['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone:['', Validators.required]
    });
  }

  getUserInfo() {
    this.profileService.getUserInfo()
    .subscribe(info => this.setUserInfoValues(info))
  }

  getUserRents() {
    this.profileService.getUserRents()
      .subscribe(rents => this.userRents = rents);
  }

  setUserInfoValues(userInfo: UserInfoDto):void {
    this.userForm.patchValue({
      username: userInfo.username,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      phone: userInfo.phone,
    })
  }

  editUser() {
    if(this.userForm.valid) {
      this.profileService.editUser(this.userForm.value)
        .subscribe(
           userInfo => {
             this.setUserInfoValues(userInfo);
             this.snacBar.open("Edytowano dane użytkownika", "", {duration:3000});
           }
        )
    }
  }

}
