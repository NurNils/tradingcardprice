import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

/**
 * Loading Interceptor
 * Holds all http requests
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  /** All http requests */
  private requests: HttpRequest<any>[] = [];

  /** Constructor */
  constructor(private loadingService: LoadingService) {}

  /** Remove request */
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i !== -1) {
      this.requests.splice(i, 1);
    }
    this.loadingService.isLoading.next(this.requests.length > 0);
  }

  /** Intercept API request and holds requests */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loadingService.isLoading.next(true);
    return new Observable((observer) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => {
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
