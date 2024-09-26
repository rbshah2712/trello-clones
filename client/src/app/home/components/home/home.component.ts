import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscribable, Subscription } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
    selector:'home',
    templateUrl:'./home.component.html',
})
export class HomeComponent implements OnInit,OnDestroy{

    isLoggedInSubscription: Subscription | undefined;
    constructor(private authservice: AuthService, private router: Router){}

    ngOnInit(): void {
        this.isLoggedInSubscription = this.authservice.isLogged$.subscribe(
            (isLoggedIn) => {
            if(isLoggedIn) {
                this.router.navigateByUrl('/boards');
            }
        })
    }

    ngOnDestroy(): void {
        this.isLoggedInSubscription.unsubscribe();
    }
}