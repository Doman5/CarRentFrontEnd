import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../model/car';
import { CarBasicInfo } from '../model/carBasicInfo';
import { CarDetailService } from './car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car!: Car;
  slug!: string;
  recommendedCars!: CarBasicInfo[];

  constructor(
    private router: ActivatedRoute,
    private carDetailService: CarDetailService
    ) {}

  ngOnInit(): void {
    this.slug = this.getSlug();
    this.getCar();
    this.getRecomendedCars();
  }

  getCar() {
    
    this.carDetailService.getCar(this.getSlug())
      .subscribe(car => this.car = car);
  }

  getSlug() {
    return this.router.snapshot.params['slug'];
  }

  getRecomendedCars() {
    this.carDetailService.getRecommendedCars(this.getSlug())
      .subscribe(recommended => this.recommendedCars =recommended)
  }
}
