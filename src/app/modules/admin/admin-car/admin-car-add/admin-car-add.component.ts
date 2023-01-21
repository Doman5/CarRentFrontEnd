import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminCarImageService} from "../admin-car-image.service";
import {AdminCarAddService} from "./admin-car-add.service";
import {AdminMessageService} from "../../../common/service/admin-message.service";
import {FormCategoryService} from "../admin-car-form/form-category.service";
import {FormTypeService} from "../admin-car-form/form-type.service";
import {AdminCategoryDto} from "../model/admin-category-dto";
import { AdminCarPhotoDto } from '../model/admin-car-photo-dto';
import { AdminCarDto } from '../model/admin-car-dto';

@Component({
  selector: 'app-admin-car-add',
  templateUrl: './admin-car-add.component.html',
  styleUrls: ['./admin-car-add.component.css']
})
export class AdminCarAddComponent implements OnInit {

  carForm!: FormGroup;
  imageForm!: FormGroup;
  categories: Array<AdminCategoryDto> = [];
  types: Array<string> = [];
  image: string | null = null;
  requiredFileTypes = "image/jpeg, image/png";
  photos: AdminCarPhotoDto[] = [];
  photoErrorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private adminCarAddService: AdminCarAddService,
    private router: Router,
    private snacBar: MatSnackBar,
    private adminMessageService: AdminMessageService,
    private adminCarImageService: AdminCarImageService,
    private formCategoryService: FormCategoryService,
    private formTypeService: FormTypeService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTypes();
    this.carForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1)]],
      bodyType: ['', Validators.required],
      carTechnicalSpecification: this.formBuilder.group({
        power: ['', Validators.required],
        engine: ['', Validators.required],
        drive: ['', Validators.required],
        acceleration: ['', Validators.required],
        gearbox: ['', Validators.required],
        fuel: ['', Validators.required],
        seats: ['', Validators.required]
      }),
      equipments: this.formBuilder.array([]),
      descriptions: this.formBuilder.array([]),
      carPrice: this.formBuilder.group({
        priceDay: ['', [Validators.required, Validators.min(1)]],
        priceHalfWeek: ['', [Validators.required, Validators.min(1)]],
        priceWeek: ['', [Validators.required, Validators.min(1)]],
        priceTwoWeeks: ['', [Validators.required, Validators.min(1)]],
        priceMonth: ['', [Validators.required, Validators.min(1)]],
        deposit: ['', [Validators.required, Validators.min(1)]],
        distanceLimit: ['', [Validators.required, Validators.min(1)]],
        distanceLimitPenalty: ['', [Validators.required, Validators.min(1)]],
        transportPricePerKm: ['', [Validators.required, Validators.min(1)]]
      }),
      category: this.formBuilder.group({
        name: ['', Validators.required]
      })
    });
    this.imageForm = this.formBuilder.group({
      file: ['']
    })
  }

  submit() {
    this.adminCarAddService.saveNewCar({
      brand: this.carForm.get('brand')?.value,
      model: this.carForm.get('model')?.value,
      year: this.carForm.get('year')?.value,
      bodyType: this.carForm.get('bodyType')?.value,
      carTechnicalSpecification: this.carForm.get('carTechnicalSpecification')?.value,
      equipments: this.carForm.get('equipments')?.value,
      descriptions: this.carForm.get('descriptions')?.value,
      carPrice: this.carForm.get('carPrice')?.value,
      category: this.carForm.get('category')?.value,
      photos: this.photos
    } as AdminCarDto)
      .subscribe({
        next: car => {
          this.router.navigate(["/admin/cars/update", car.id])
            .then(() => this.snacBar.open("Auto zostało dodane", "", {duration: 3000}))
        },
        error: err => this.adminMessageService.addSpringError(err.error)
      })
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
      let formData = new FormData();
      if(!this.checkBasicCarInfosIsDeclared()) {
        this.photoErrorMessage = "Żeby wstawić zdjęcie musisz ustawić marke, model i rok"
      } else {
        let carName = this.carForm.get('brand')?.value + "-" + this.carForm.get('model')?.value + "-" + this.carForm.get('year')?.value;
        formData.append('file', this.imageForm.get('file')?.value);
        this.adminCarAddService.uploadImage(formData, carName)
          .subscribe(result => {
            console.log(result);
            this.photos.push(result);
            
          })
      }
    }
  checkBasicCarInfosIsDeclared(): boolean {
    return (this.carForm.get('brand')?.value != "" && this.carForm.get('model')?.value != "" && this.carForm.get('year')?.value != "")
  }
  
    deletePhoto(index: number, photoId: number) {
      if (index > -1) {
        this.photos.splice(index, 1);
      }
  
      this.adminCarAddService.deletePhoto(photoId)
        .subscribe()
    }


  getCategories() {
    this.formCategoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getTypes() {
    this.formTypeService.getTypes()
      .subscribe(types => this.types = types)
  }

  get equipments() {
    return this.carForm.get('equipments') as FormArray;
  }
  
  addEquipment() {
    this.equipments.push(this.formBuilder.control(''));
  }
  
  deleteEquipment(index: number) {
    this.equipments.removeAt(index);
  }

  get descriptions() {
    return this.carForm.get('descriptions') as FormArray;
  }
  
  addDescription() {
    this.descriptions.push(this.formBuilder.control(''));
  }
  
  deleteDescription(index: number) {
    this.descriptions.removeAt(index);
  }


  get brand() {
    return this.carForm.get("brand")
  }

  get model() {
    return this.carForm.get("model")
  }

  get year() {
    return this.carForm.get("year")
  }

  get type() {
    return this.carForm.get("type")
  }

}
