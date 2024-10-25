import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from '@shared/store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from '@shared/store/auth/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { SpinnerInterceptor } from '@core/interceptors/spinner.interceptor';
import { ResponseNotificationHttpInterceptor } from '@core/interceptors/response.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideIonicAngular } from '@ionic/angular/standalone';  // Importa el módulo de animaciones

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      SpinnerInterceptor,
      ResponseNotificationHttpInterceptor
    ])),
    importProvidersFrom(HttpClientModule),
    provideStore({ user: userReducer }),
    provideEffects([UserEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    MessageService,
    importProvidersFrom(ToastModule),
    importProvidersFrom(BrowserAnimationsModule), provideIonicAngular({})  // Añade las animaciones aquí
],
};
