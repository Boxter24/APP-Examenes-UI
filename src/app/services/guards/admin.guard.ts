import { SigninService } from 'src/app/services/signin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private signinService: SigninService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.signinService.isLoggedIn() && this.signinService.getUserRole() == 'ADMIN'){
        return true;
      }
    
      this.router.navigate(['login-register']);
        return false;
      }  
  
}
