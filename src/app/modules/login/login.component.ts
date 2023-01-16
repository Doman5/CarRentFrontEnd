import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { JwtService } from '../common/service/jwt.service';
import { LoginService } from '../common/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  loginError = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private router: Router
    ) {}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next: response => {
            this.jwtService.setToken(response.token);
            this.router.navigate(['/profil'])
          },
          error: err => {
            this.loginError = true;
          }
        })
    }
  }

}
