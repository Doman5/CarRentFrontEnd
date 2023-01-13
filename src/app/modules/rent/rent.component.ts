import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { LoginService } from '../common/service/login.service';
import { RentCar } from './model/rentCar';
import { RentDateAndPlace } from './model/rentDateAndPlace';
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
    private loginService: LoginService
    ) {}

  @ViewChild(MatTabGroup) matTabGroup !: MatTabGroup;
  cars!: RentCar[];
  rentDateAndPlace !: RentDateAndPlace;
  today!:Date;
  tomorrow!:Date;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  placeDateForm!: FormGroup;
  chosenCar!: RentCar | null | undefined;
  userLogged!: boolean;
  rentSummary!: any;
  loginError = false;
  registerError = false;
  registerErrorMessage!: string;

  ngOnInit(): void {
    this.today = this.addHours(new Date(), 3);
    this.tomorrow = this.addHours(new Date(), 4);
    let defaultPlaceAndDate: RentDateAndPlace = this.setDefaultPlaceAndDate();
    this.getRentsCars(defaultPlaceAndDate, false);
    this.placeDateForm = this.formBuilder.group({
      rentalDate: ['', Validators.required],
      rentalPlace: ['Sochaczew', Validators.required],
      returnDate: ['', Validators.required],
      returnPlace: ['Sochaczew', Validators.required],
      onlyAvailable: ['']
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
      repeatPassword: ['',Validators.required]
    });
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
    
  }
  
  getRentsCars(placeAndDate: RentDateAndPlace, onlyAvailable: boolean) {
    this.rentService.getRentCars(placeAndDate, onlyAvailable)
      .subscribe(cars => this.cars = cars);
  }

  searchCar() {
    this.getRentsCars({
      rentalDate: this.placeDateForm.get('rentalDate')?.value,
      rentalPlace: this.placeDateForm.get('rentalPlace')?.value,
      retrunDate: this.placeDateForm.get('returnDate')?.value,
      retrunPlace: this.placeDateForm.get('returnPlace')?.value
    } as RentDateAndPlace, this.placeDateForm.get('onlyAvailable')?.value)
  }

  setDefaultPlaceAndDate(): RentDateAndPlace {
    return {
      rentalDate: this.today,
      rentalPlace: "Sochaczew",
      retrunDate: this.tomorrow,
      retrunPlace: "Sochaczew"
    } as RentDateAndPlace
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
  }

  login() {

  }

  register() {
    if(this.registerForm.valid) {
      this.loginService.register(this.registerForm.value)
      .subscribe()
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
