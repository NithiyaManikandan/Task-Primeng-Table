import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastService } from 'src/app/service/toast.service';

@Injectable()
export class ToasterInterceptor implements HttpInterceptor {
  constructor(private service: ToastService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          this.service.showToast$(error);
        },
        next: (data) => {
          if (data.type != 0) {
            this.service.showToast$(data);
          }
        },
      })
    );
  }
}
