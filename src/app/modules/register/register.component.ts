import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../common/service/jwt.service';
import { LoginService } from '../common/service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  registerError = false;
  registerErrorMessage!: string;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private router: Router
    ) {}
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      phone: ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      repeatPassword: ['',[Validators.required,Validators.minLength(6)]]
    })
  }

  register() {
    if(this.registerForm.valid && this.isPasswordsIdentical(this.registerForm.value)) {
      this.loginService.register(this.registerForm.value)
      .subscribe({
        next: response => {
          this.jwtService.setToken(response.token);
          this.router.navigate(["/profil"])
      }, error: err => {
        this.registerError = true;
        this.registerErrorMessage = "Coś poszło źle spróbuj ponownie później";
      }})
    }
  }

  private isPasswordsIdentical(register: any) {
    if(register.password === register.repeatPassword) {
      this.registerError = false;
      return true;
    }
    this.registerError = true;
    this.registerErrorMessage = "Hasła nie są identyczne";
    return false;
  }

}
