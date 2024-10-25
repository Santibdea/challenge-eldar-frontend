import { HttpInterceptorFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '@services/generic/notification.service';

export const ResponseNotificationHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {

        // SIMULAMOS EL ERROR CON EL ARRAY VACIO PORQUE LA API DE JSON-PLACEHOLDER NO DEVUELVE CON ERRORES SOLO UN ARRAY VACIO
        if (Array.isArray(event.body) && event.body.length === 0) {
          notificationService.showError('Error', );
        } else {
          notificationService.showSuccess('Operación realizada con éxito.');
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const errorMessage = error.message || 'Ocurrió un error inesperado.';
      notificationService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};
