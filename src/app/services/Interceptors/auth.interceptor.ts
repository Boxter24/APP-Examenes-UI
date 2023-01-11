import { SigninService } from 'src/app/services/signin.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { LoaderService } from '../loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private signinService: SigninService,
        private loaderService: LoaderService,  
    ) {

    } 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {             
        
        this.loaderService.mostrarLoader();

        let authReq = req;
        const token = this.signinService.getToken();
        if(token != null){
        authReq = authReq.clone({
            setHeaders : {Authorization: `Bearer ${token}` }
        })
        }
        return next.handle(authReq).pipe(
            finalize(() => this.loaderService.ocultarLoader())
        );
    }

}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]