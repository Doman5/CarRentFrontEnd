import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminCarImageService} from "../admin-car-image.service";
import {AdminCarAddService} from "./admin-car-add.service";
import {AdminMessageService} from "../../../common/service/admin-message.service";
import {FormCategoryService} from "../admin-car-form/form-category.service";
import {FormTypeService} from "../admin-car-form/form-type.service";
import {AdminCategoryDto} from "../model/admin-category-dto";

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
  requiredFileTypes = "image/jpeg, image/png"

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
      photos: this.formBuilder.array([
        this.formBuilder.control('photo'),
      ])})
  }

  submit() {
    this.adminCarAddService.saveNewCar(this.carForm.value)
      .subscribe({
        next: car => {
          this.router.navigate(["/admin/cars/update", car.id])
            .then(() => this.snacBar.open("Auto zostało dodane", "", {duration: 3000}))
        },
        error: err => this.adminMessageService.addSpringError(err.error)
      })
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imageForm.get("file")?.value);
    this.adminCarImageService.uploadImage(formData)
      .subscribe(result => this.image = result.filename);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageForm.patchValue({
        file: event.target.files[0]
      });
    }
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
