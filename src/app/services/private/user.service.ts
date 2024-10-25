import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@services/generic';
import { UserResponse } from '@interfaces/login.interface';
import { map } from 'rxjs/operators';
import { UserDTO } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {


  getAllUsers(): Observable<UserDTO[]> {
    return this._http.get<UserResponse[]>(this.getUrl(this.usersEndpoint)).pipe(
      map((users: any[]) =>
        users.map(user => ({
          id: user.id,
          email: user.email,
          avatar: user.avatar
        }))
      )
    );
  }
  
}
