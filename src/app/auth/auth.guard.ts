import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";

@Injectable(
   {providedIn:'root'} 
)
export class AuthGuard implements CanActivate {

    constructor(private authService:AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
                
            })
        )
    }
}



export const AuthGuardFn: CanActivateFn = (route, state) => {
    
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user.pipe(
        take(1),
        map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return router.createUrlTree(['/auth']);
            
        })
    )
}