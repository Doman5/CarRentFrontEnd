import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/modules/common/service/jwt.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit{

  isLoggedIn = false;

  constructor(private jwtService: JwtService) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.jwtService.isLoggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
  }

}
