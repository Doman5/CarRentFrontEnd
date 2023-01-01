import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormCategoryService } from '../admin-car-form/form-category.service';
import { FormTypeService } from '../admin-car-form/form-type.service';
import { AdminCarBasicInfo } from '../model/admin-basic-info';
import { AdminCarTechnicalSpecificationDto } from '../model/admin-car-technical-specification-dto';
import { AdminCategoryDto } from '../model/admin-category-dto';
import { AdminCarUpdateService } from './admin-car-update.service';

@Component({
  selector: 'app-admin-car-update',
  templateUrl: './admin-car-update.component.html',
  styleUrls: ['./admin-car-update.component.css']
})
export class AdminCarUpdateComponent implements OnInit{

  categories: Array<AdminCategoryDto> = [];
  types: Array<string> = [];
  carBasicForm!: FormGroup;
  technicalSpecificationForm!: FormGroup;
  carEquipmentForm!: FormGroup;
  carDescriptionForm!: FormGroup;
  carPriceForm!: FormGroup;
  categoryForm!: FormGroup;
  
  constructor(
    private router: ActivatedRoute,
    private formCategoryService: FormCategoryService,
    private formTypeService: FormTypeService,
    private formBuilder: FormBuilder,
    private adminCarUpdateService: AdminCarUpdateService,
    private snacbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
        this.getBasicInfo();
        this.getCategories();
        this.getTypes()
        this.carBasicForm = this.formBuilder.group({
          brand: ['', [Validators.required]],
          model: ['', Validators.required],
          year: ['', [Validators.required, Validators.min(1)]],
          type: ['', Validators.required]});

        this.getCarTechSpec();
        this.technicalSpecificationForm = this.formBuilder.group({
          power: [''],
          engine: [''],
          drive: [''],
          acceleration: [''],
          gearbox: [''],
          fuel: [''],
          seats: ['']
        });
        
        this.carEquipmentForm = this.formBuilder.group({
          
        });

        this.carDescriptionForm = this.formBuilder.group({

        });

        this.carPriceForm = this.formBuilder.group({
          priceDay: [''],
          priceHalfWeek: [''],
          priceWeek: [''],
          priceTwoWeeks: [''],
          priceMonth: [''],
          deposit: [''],
          distanceLimit: [''],
          distanceLimitPenalty: [''],
          transportPricePerKm: ['']
        });
          
        this.categoryForm = this.formBuilder.group({
          name: ['']
        });
      }

  getBasicInfo() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.getBasicInfo(id)
    .subscribe(carBasicInfo => this.mapBasicInfoFormValues(carBasicInfo))
  }
      
  submitCarBasicInfo() {
    let id = Number(this.router.snapshot.params['id'])
      this.adminCarUpdateService.updateBasicInfo(id, {
        brand: this.carBasicForm.get('brand')?.value,
        model: this.carBasicForm.get('model')?.value,
        year: this.carBasicForm.get('year')?.value,
        type: this.carBasicForm.get('type')?.value,
      } as AdminCarBasicInfo).subscribe({
          next: carBasicInfo => {
            this.mapBasicInfoFormValues(carBasicInfo);
            this.snacbar.open("Zaktualizowane podstawowe informacje!", "", {duration:3000});
          }
        })
  }
  
  mapBasicInfoFormValues(car: AdminCarBasicInfo): void {
    this.carBasicForm.patchValue({
      brand: car.brand,
      model: car.model,
      year: car.year,
      type: car.type
    });
  }

  getCarTechSpec() {
    let id = Number(this.router.snapshot.params['id'])
    this.adminCarUpdateService.getCarTechSpec(id)
      .subscribe(carTechSpec => this.mapCarTechSpecFormValue(carTechSpec))
  }

  mapCarTechSpecFormValue(techSpec: AdminCarTechnicalSpecificationDto): void {
    this.technicalSpecificationForm.setValue({
      power: techSpec.power,
          engine: techSpec.engine,
          drive: techSpec.drive,
          acceleration: techSpec.acceleration,
          gearbox: techSpec.gearbox,
          fuel: techSpec.fuel,
          seats: techSpec.seats
    })
  }


  submitCarTechSpec() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.updateTechSpec(id, {
      power: this.technicalSpecificationForm.get('power')?.value,
      engine: this.technicalSpecificationForm.get('engine')?.value,
      acceleration: this.technicalSpecificationForm.get('acceleration')?.value,
      drive: this.technicalSpecificationForm.get('drive')?.value,
      fuel: this.technicalSpecificationForm.get('fuel')?.value,
      gearbox: this.technicalSpecificationForm.get('gearbox')?.value,
      seats: this.technicalSpecificationForm.get('seats')?.value
    } as AdminCarTechnicalSpecificationDto).subscribe({
      next: carTechSpec => {
        this.mapCarTechSpecFormValue(carTechSpec);
        this.snacbar.open("Zaktualizowane specyfikacje techniczną!", "", {duration:3000});
      }

    })
  }

  submitCarEquipment() {

  }

  submitCarDescription() {

  }

  submitCarPrice() {

  }

  submitCategory() {

  }

  getCategories() {
    this.formCategoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getTypes() {
    this.formTypeService.getTypes()
      .subscribe(types => this.types = types)
  }

  get brand() {
    return this.carBasicForm.get("brand")
  }

  get model() {
    return this.carBasicForm.get("model")
  }

  get year() {
    return this.carBasicForm.get("year")
  }

  get type() {
    return this.carBasicForm.get("type")
  }
}


