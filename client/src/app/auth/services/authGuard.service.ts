import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuardService implements CanActivate  {
    
    constructor(private authservice: AuthService,private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
        return this.authservice.isLogged$.pipe(
            map((isLoggedIn) => {
            if(isLoggedIn) {
                return true;
            }
            this.router.navigateByUrl('/');
            return false;
        })
        );
    }
}