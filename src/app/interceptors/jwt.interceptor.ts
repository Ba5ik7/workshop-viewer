import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserStateService } from '../shared/services/user-state/user-state.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userStateService: UserStateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const user = this.userStateService.user;
        const isLoggedIn = user?.accessToken;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        // if (isLoggedIn && isApiUrl) {
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.accessToken}` }
            });
        }

        return next.handle(request);
    }
}