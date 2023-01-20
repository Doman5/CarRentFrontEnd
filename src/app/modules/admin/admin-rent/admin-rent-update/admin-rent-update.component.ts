import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminRentUpdateService } from './admin-rent-update.service';
import { AdminFullRentInfo } from './model/adminFullIRentInfo';

@Component({
  selector: 'app-admin-rent-update',
  templateUrl: './admin-rent-update.component.html',
  styleUrls: ['./admin-rent-update.component.css']
})
export class AdminRentUpdateComponent implements OnInit{

  rent!: AdminFullRentInfo;
  statusForm!: FormGroup;
  statuses!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private adminRentUpdateService: AdminRentUpdateService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getStatuses();
    this.getRent();
    this.statusForm = this.formBuilder.group({
      rentStatus: ['', Validators.required]
    });
  }

  getStatuses() {
    this.adminRentUpdateService.getStatuses()
      .subscribe(statuses => this.statuses = statuses);
  }

  getRent() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminRentUpdateService.getRent(id)
      .subscribe(rent => {
        this.rent = rent;
        this.setStatusValue(rent.rentStatus)
      })
  }

  setStatusValue(status: string) {
    this.statusForm.setValue({
      rentStatus: status
    })
  }

  changeStatus() {
    if(this.statusForm.valid) {
      this.adminRentUpdateService.changeStatus(this.rent.id,this.statusForm.value)
        .subscribe()
    }
    
  }

}



