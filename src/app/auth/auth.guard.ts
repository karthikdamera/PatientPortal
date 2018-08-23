import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { tokenNotExpired } from 'angular2-jwt';


/**
 * Decides if a route can be activated.
 */
@Injectable() export class AuthGuard implements CanActivate {

    constructor(public authenticationService: AuthService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.IsUserLoggedIn()) {
            // Signed in.
            return true;
        }
       // Stores the attempted URL for redirecting.
        // const url: string = state.url;
        const url = state.url.split('/');
       // alert(url);
        // this.authenticationService.redirectUrl = url;
        // // Not signed in so redirects to signin page.
        if (url[1] === 'admin') {
            this.router.navigate(['/admin']);
        }
        if (url[1] === 'person') {
            this.router.navigate(['/scheduler']);
        }
    }
}
