import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormCategoryService } from '../admin-car-form/form-category.service';
import { FormTypeService } from '../admin-car-form/form-type.service';
import { AdminCarBasicInfo } from '../model/admin-basic-info';
import { AdminCarPhotoDto } from '../model/admin-car-photo-dto';
import { AdminCarPriceDto } from '../model/admin-car-price-dto';
import { AdminCarTechnicalSpecificationDto } from '../model/admin-car-technical-specification-dto';
import { AdminCategoryDto } from '../model/admin-category-dto';
import { AdminDescriptionDto } from '../model/admin-description-dto';
import { AdminEquipmentDto } from '../model/admin-equipment-dto';
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
  imageForm!: FormGroup;
  requiredFileTypes = "image/jpeg, image/png";
  image: string | null = null;
  photos!: AdminCarPhotoDto[];

  
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
        this.getCarPrice();
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
          
        this.getCategory();
        this.categoryForm = this.formBuilder.group({
          name: ['']
        });
        this.imageForm = this.formBuilder.group({
          file: ['']
        })
        this.getCarPhotos();
        this.carDescriptionForm = this.formBuilder.group({
          descriptions: this.formBuilder.array([])
        })
        this.getCarDescriptions();
        this.carEquipmentForm = this.formBuilder.group({
          equipments: this.formBuilder.array([])
        })
        this.getCarEquipment();
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
    this.technicalSpecificationForm.patchValue({
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
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.updateEquipment(this.equipments.value, id)
    .subscribe(equipments => {
      equipments.forEach(equipment => this.mapEquipmentValue(equipment));
      this.snacbar.open("Zaktualizowane wyposażenie samochodu!", "", {duration:3000});
    }
    )
  }

  getCarEquipment() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.getEquipments(id)
      .subscribe(equipments => {
        for(let equipment of equipments) {
          this.equipments.push(this.mapEquipmentValue(equipment));
        }
      })
  }

  mapEquipmentValue(equipment: AdminEquipmentDto):FormControl {
    let control = new FormControl();
    control.setValue(equipment.name);
    return control;
    
  }

  get equipments() {
    return this.carEquipmentForm.get('equipments') as FormArray;
  }
  
  addEquipment() {
    this.equipments.push(this.formBuilder.control(''));
  }

  deleteEquipment(index: number) {
    this.equipments.removeAt(index);
  }

  submitCarDescription() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.updateDescriptions(this.descriptions.value, id)
    .subscribe( descriptions => {
      descriptions.forEach(description => this.mapDescriptionValue(description));
      this.snacbar.open("Zaktualizowane opisy samochodu!", "", {duration:3000});
    }
    )
  }

  getCarDescriptions() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.getDescriptions(id)
      .subscribe(descriptions => {
        for(let description of descriptions) {
          this.descriptions.push(this.mapDescriptionValue(description));
        }
      })
  }

  mapDescriptionValue(description: AdminDescriptionDto):FormControl {
    let control = new FormControl();
    control.setValue(description.description);
    return control;
    
  }

  get descriptions() {
    return this.carDescriptionForm.get('descriptions') as FormArray;
  }
  
  addDescription() {
    this.descriptions.push(this.formBuilder.control(''));
  }

  deleteDescription(index: number) {
    this.descriptions.removeAt(index);
  }

  getCarPrice() {
    let id = Number(this.router.snapshot.params['id'])
    this.adminCarUpdateService.getCarPrices(id)
      .subscribe(car => this.mapCarPriceFormValue(car))
  }

  mapCarPriceFormValue(car: AdminCarPriceDto): void {
    this.carPriceForm.setValue({
          priceDay: car.priceDay,
          priceHalfWeek: car.priceHalfWeek,
          priceWeek: car.priceWeek,
          priceTwoWeeks: car.priceTwoWeeks,
          priceMonth: car.priceMonth,
          deposit: car.deposit,
          distanceLimit : car.distanceLimit,
          distanceLimitPenalty: car.distanceLimitPenalty,
          transportPricePerKm: car.transportPricePerKm
    })
  }

  submitCarPrice() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.updateCarPrice(id, {
          priceDay: this.carPriceForm.get('priceDay')?.value,
          priceHalfWeek: this.carPriceForm.get('priceHalfWeek')?.value,
          priceWeek: this.carPriceForm.get('priceWeek')?.value,
          priceTwoWeeks: this.carPriceForm.get('priceTwoWeeks')?.value,
          priceMonth: this.carPriceForm.get('priceMonth')?.value,
          deposit: this.carPriceForm.get('deposit')?.value,
          distanceLimit : this.carPriceForm.get('distanceLimit')?.value,
          distanceLimitPenalty: this.carPriceForm.get('distanceLimitPenalty')?.value,
          transportPricePerKm: this.carPriceForm.get('transportPricePerKm')?.value,
    } as AdminCarPriceDto).subscribe({
      next: carPrice => {
        this.mapCarPriceFormValue(carPrice);
        this.snacbar.open("Zaktualizowane specyfikacje techniczną!", "", {duration:3000});
      }
    })
  }

  getCategory() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.getCategory(id)
      .subscribe(category => this.mapCarCategoryFormValue(category))
  }

  mapCarCategoryFormValue(category: AdminCategoryDto): void {
    this.categoryForm.setValue({
      name: category.name
    })
  }

  submitCategory() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.updateCarCategory(id, {
      name: this.categoryForm.get('name')?.value
    } as AdminCategoryDto).subscribe({
      next: category => {
        this.mapCarCategoryFormValue(category);
        this.snacbar.open("Zaktualizowano kategorie!", "", {duration:3000});
      }
    })
  }

  getCategories() {
    this.formCategoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getTypes() {
    this.formTypeService.getTypes()
      .subscribe(types => this.types = types)
  }

  onFileChange(event: any) {
    if(event.target.files.length > 0) {
      console.log(event.target.files[0]);
      this.imageForm.patchValue({
        file: event.target.files[0]
      });
    }
  }

  uploadFile() {
    let id = Number(this.router.snapshot.params['id']);
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.adminCarUpdateService.uploadImage(formData, id)
      .subscribe(result => this.photos.push(result))
  }

  getCarPhotos() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminCarUpdateService.getCarPhotos(id)
      .subscribe(result => this.photos = result)
  }

  deletePhoto(index: number, photoId: number) {
    if (index > -1) {
      this.photos.splice(index, 1);
    }

    this.adminCarUpdateService.deletePhoto(photoId)
      .subscribe()
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


 

