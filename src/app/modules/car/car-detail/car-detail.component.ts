import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../model/car';
import { CarDetailService } from './car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car!: Car;
  slug!: string;

  constructor(
    private router: ActivatedRoute,
    private carDetailService: CarDetailService
    ) {}

  ngOnInit(): void {
    this.getSlug();
    this.getCar();
  }

  getCar() {
    let slug = this.router.snapshot.params['slug'];
    this.carDetailService.getCar(slug)
      .subscribe(car => this.car = car);
  }

  getSlug() {
    this.slug = this.router.snapshot.params['slug'];
  }
}
