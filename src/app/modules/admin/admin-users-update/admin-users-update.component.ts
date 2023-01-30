import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsersService } from '../admin-users/admin-users.service';
import { AdminUserDto } from '../admin-users/model/adminUserDto';

@Component({
  selector: 'app-admin-users-update',
  templateUrl: './admin-users-update.component.html',
  styleUrls: ['./admin-users-update.component.css']
})
export class AdminUsersUpdateComponent implements OnInit {

  userForm!: FormGroup;
  rolesForm!: FormGroup;

  constructor(
    private adminUserService: AdminUsersService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute) {}
 
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: [{value: '', disabled: true}],
      firstName: [{value: '', disabled: true}],
      lastName: [{value: '', disabled: true}],
      phone: [{value: '', disabled: true}]
    })
    this.rolesForm = this.formBuilder.group({
      admin: false,
      customer: false,
      worker: false
    })
    this.getUser();
  }

  getUser() {
    let username = this.router.snapshot.params['username'];
    this.adminUserService.getUser(username)
      .subscribe(user => {
        this.mapUserFormValues(user);
      })
  }

  mapUserFormValues(user: AdminUserDto): void {
    let adminRole = user.roles.some(role => {
      if(role === "ADMIN") {
        return true;
      }
      return false;
    })

    let customerRole = user.roles.some(role => {
      if(role === "CUSTOMER") {
        return true;
      }
      return false;
    })

    let workerRole = user.roles.some(role => {
      if(role === "WORKER") {
        return true;
      }
      return false;
    })

    this.userForm.setValue({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    })

    this.rolesForm.setValue({
      admin: adminRole,
      customer: customerRole,
      worker: workerRole
    })
  }

  changeRoles() {
    let username = this.router.snapshot.params['username'];
    this.adminUserService.patchRoles(this.rolesForm.value, username)
      .subscribe(user => this.mapUserFormValues(user))
  }
}

