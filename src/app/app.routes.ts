import { Routes } from '@angular/router';
import { AuthGuard, PublicGuard } from '@core/guards';
import { HomeComponent } from '@views/private/home/home.component';
import { LoginComponent } from '@views/public/login/login.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [PublicGuard],
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: LoginComponent.PATH,
    canActivate: [PublicGuard],
    component: LoginComponent,
  },
  {
    path: HomeComponent.PATH,
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
];
