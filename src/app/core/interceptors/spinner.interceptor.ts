import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '@services';
import { finalize } from 'rxjs/operators';

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService); 

  spinnerService.show();  

  return next(req).pipe(
    finalize(() => spinnerService.hide())
  );
};
