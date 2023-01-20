import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JwtService } from 'src/app/modules/common/service/jwt.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  constructor(private jwtService: JwtService,
    private router: Router) {}

  logout() {
    this.jwtService.logout();
    this.router.navigate(["/admin/login"])
  }

}
