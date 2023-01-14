import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "../service/jwt.service";


@Injectable()
export class AdminAuthorizationGuard implements CanActivate{

constructor(private jwtService: JwtService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(!this.jwtService.isLoggedIn() || !this.jwtService.getAdminAccess()) {
            this.router.navigate(["/admin/login"]);
        }
        return true;
    }

}