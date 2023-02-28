import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserStateService } from '../shared/services/user-state/user-state.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private userStateService: UserStateService
    ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      catchError(err => {
        if (err.status === 401) {
          this.userStateService.signedIn.next(false);
          this.router.navigate(['/']);
        }
        const error = err.error.message || err.statusText;
        return throwError(() => new Error(error));
      }
    ));
  }
}