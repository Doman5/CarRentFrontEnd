import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { JwtService } from '../common/service/jwt.service';
import { LoginService } from '../common/service/login.service';
import { InitRent } from './model/initRent';
import { PaymentDto } from './model/paymentDto';
import { RentCar } from './model/rentCar';
import { RentDateAndPlace } from './model/rentDateAndPlace';
import { RentDto } from './model/rentDto';
import { RentService } from './rent.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  
  constructor(
    private rentService: RentService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService
    ) {}

  @ViewChild(MatTabGroup) matTabGroup !: MatTabGroup;
  cars!: RentCar[];
  rentDateAndPlace !: RentDateAndPlace;
  today!:Date;
  tomorrow!:Date;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  placeDateForm!: FormGroup;
  paymantForm!: FormGroup;
  chosenCar!: RentCar | undefined;
  userLogged!: boolean | undefined;
  chosenPaymentId!: number | undefined;
  rentSummary!: any;
  loginError = false;
  registerError = false;
  registerErrorMessage!: string;
  initData!: InitRent;
  

  ngOnInit(): void {
    this.today = this.addHours(new Date(), 4);
    this.tomorrow = this.addHours(new Date(), 5);
    this.getInitData();
    this.placeDateForm = this.formBuilder.group({
      rentalDate: ['', Validators.required],
      rentalPlace: ['Sochaczew', Validators.required],
      returnDate: ['', Validators.required],
      returnPlace: ['Sochaczew', Validators.required],
      onlyAvailable: [''],
      sortingType: new FormControl
    });

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      phone: ['', [Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      repeatPassword: ['',[Validators.required,Validators.minLength(6)]]
    });
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
    this.paymantForm = this.formBuilder.group({
      payment: ['',Validators.required]
    })
    this.setDefaultFormValues();
    this.getRentsCars(this.placeDateForm.value, false, "Malejaco");
    
  }
  
  getRentsCars(placeAndDate: RentDateAndPlace, onlyAvailable: boolean, sortingType: string) {
    this.rentService.getRentCars(placeAndDate, onlyAvailable, sortingType)
      .subscribe(cars => this.cars = cars);
  }

  searchCar() {
    let onlyAvailable = this.placeDateForm.get('onlyAvailable')?.value;

    if(this.placeDateForm.get('onlyAvailable')?.value === '') {
       onlyAvailable = false;
    }

    let sortingType = this.placeDateForm.get('sortingType')?.value;

    if(this.placeDateForm.get('sortingType')?.value === '') {
      sortingType = "Malejaco"
    }

    this.getRentsCars({
      rentalDate: this.placeDateForm.get('rentalDate')?.value,
      rentalPlace: this.placeDateForm.get('rentalPlace')?.value,
      returnDate: this.placeDateForm.get('returnDate')?.value,
      returnPlace: this.placeDateForm.get('returnPlace')?.value
    } as RentDateAndPlace, onlyAvailable, sortingType)
  }

   addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  };

  goNext(car: RentCar) {
    this.chosenCar = car;
    this.matTabGroup.selectedIndex = 1;
  }

  choseMenuOption(event: any) {
    console.log(event)
      if(event === 0) {
         this.chosenCar = undefined;
      }
      if(event === 1) {
        this.userLogged = undefined;
        localStorage.removeItem("token");
      }

      if(event === 2) {
        this.chosenPaymentId = undefined;
      }
  }

  login() {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next: response => {
            this.jwtService.setToken(response.token);
            this.matTabGroup.selectedIndex = 2;
            this.userLogged = true;
          },
          error: err => {
            this.loginError = true;
          }
        })
    }

  }

  register() {
    if(this.registerForm.valid && this.isPasswordsIdentical(this.registerForm.value)) {
      this.loginService.register(this.registerForm.value)
      .subscribe({
        next: response => {
          this.jwtService.setToken(response.token);
          this.matTabGroup.selectedIndex = 2;
          this.userLogged = true;
      }, error: err => {
        this.registerError = true;
        this.registerErrorMessage = "Coś poszło źle spróbuj ponownie później";
      }})
    }
  }

  setDefaultFormValues() {
    this.placeDateForm.setValue({
      rentalDate: this.today.toISOString().slice(0, 16),
      rentalPlace: "Sochaczew",
      returnDate: this.tomorrow.toISOString().slice(0, 16),
      returnPlace: "Sochaczew",
      onlyAvailable: false,
      sortingType: "Malejaco"
    })
  }

  getInitData() {
    this.rentService.getInitData()
      .subscribe(initData => this.initData = initData)
  }

  chosePaymant() {
    if(this.paymantForm.valid) {
      this.chosenPaymentId = this.paymantForm.get('payment')?.value;
      this.matTabGroup.selectedIndex = 4;
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

  reserve() {
    this.rentService.placeRent({
      carId: this.chosenCar?.carId,
      grossValue: this.chosenCar?.grossValue,
      rentalPrice: this.chosenCar?.rentalPrice,
      returnPrice: this.chosenCar?.returnPrice,
      rentalPlace: this.chosenCar?.rentalPlace,
      returnPlace: this.chosenCar?.returnPlace,
      rentalDate: this.chosenCar?.rentalDate,
      returnDate: this.chosenCar?.returnDate,
      paymentId: this.chosenPaymentId
    } as unknown as RentDto).subscribe(
      rentSummary => this.rentSummary = rentSummary
    )
  }
}
