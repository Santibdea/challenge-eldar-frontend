import { Injectable } from '@angular/core';
import { LoginBody, UserResponse } from '@interfaces/login.interface';
import { HttpService } from '@services';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService extends HttpService {


  login(body: LoginBody): Observable<UserResponse[]> {
    return this._http.get<UserResponse[]>(this.getUrl(`/users?email=${body.email}&password=${body.password}`));
  }
  
 
}
