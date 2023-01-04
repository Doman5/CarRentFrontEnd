import { Component, OnInit } from '@angular/core';
import { CarService } from './car.service';
import { CarBasicInfo } from './model/car';
import { KeyValuePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [KeyValuePipe]
})
export class CarComponent implements OnInit {

  constructor(private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {}
  
  filterForm!: FormGroup;
  filterParamsList = new Array<string>;
  cars: CarBasicInfo[] = [];
  brands: Map<String, number> = new Map;
  years: Map<number, number> = new Map;
  bodyTypes: Map<string, number> = new Map;
  

  ngOnInit(): void {
    this.getCars();
    this.getFilters();
    this.filterForm = this.formBuilder.group({});
    for (const [key, value] of Object.entries(this.years)) {
      this.filterForm.addControl(key, this.formBuilder.control(false));
    }
  }

  getCars() {
    this.carService.getCars()
      .subscribe(cars => this.cars = cars)
  }

  getFilters() {
    this.carService.getFilters()
      .subscribe(filters => {
        this.brands = filters.brands;
        this.years = filters.years;
        this.bodyTypes = filters.bodyTypes;
      })
  }

  submit() {
    let preparedUrl = this.filterParamsList.join("&");
    this.carService.getCarsWithFilters(preparedUrl)
      .subscribe(cars => this.cars = cars)
      }

  changeBrand(event: any, carname: String) {
    if(event.checked) {
      this.filterParamsList.push(`brand=${carname}`)
    }
    if(!event.checked) {
      let index = this.filterParamsList.indexOf(`brand=${carname}`);
    }
  }

  chngeYear(event: any, year: string) {
    if(event.checked) {
      this.filterParamsList.push(`year=${year}`)
    }
    if(!event.checked) {
      let index = this.filterParamsList.indexOf(`year=${year}`);
      delete this.filterParamsList[index];
    }
  }

  changeBodyType(event: any, type: string) {
    if(event.checked) {
      this.filterParamsList.push(`type=${type}`)
    }
    if(!event.checked) {
      let index = this.filterParamsList.indexOf(`type=${type}`);
      delete this.filterParamsList[index];
    }
  }

}
