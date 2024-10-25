// DEJO UN EJEMPLO DE COMO SERIA UN TKOEN INTERCEPTOR BASADO EN OTROS PROYECTOS DE MI AUTORIA, SIN EMBARGO NO ES POSIBLE
// REALIZAR EN ESTE UN INTERCEPTOR PARA TOKEN DEBIDO A QUE EL JSON-SERVER NO MANEJA LOGICA COMO TAL.

// import { HttpInterceptorFn } from '@angular/common/http';
// import { TokenService } from '@services/generic';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = TokenService.getToken;
//   const withToken = req.params.get('token') || '';
//   if (!['false'].includes(withToken) && token) {
//     const updatedRequest = req.clone({
//       setHeaders: TokenService.headersTokenJwt,
//     });
//     return next(updatedRequest);
//   } else {
//     const modifiedRequest = req.clone();
//     const params = modifiedRequest.params;
//     params['map'].delete('token');
//     params.delete('token');
//     const finalRequest = modifiedRequest.clone({
//       params,
//     });

//     return next(finalRequest);
//   }

// };
