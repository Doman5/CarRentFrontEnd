import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JwtService } from '../../common/service/jwt.service';
import { AdminLoginService } from './admin-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  loginForm!: FormGroup;
  loginError = false;

  constructor(
    private formBuilder:FormBuilder,
    private adminLoginService: AdminLoginService,
    private jwt: JwtService,
    private router: Router
    ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {
      this.adminLoginService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            this.loginError = false;
            if(response.adminAccess) {
              this.jwt.setToken(response.token);
              this.jwt.setAdminAccess(true);
            }
            this.router.navigate(['/admin/cars']);
          },
          error: () => this.loginError = true
        })
    }
  }

}
