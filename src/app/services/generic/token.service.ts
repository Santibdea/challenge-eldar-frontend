import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public static TOKEN_JWT = 'token_jwt';
  private static token: string | null = null;
  private isLogout: boolean = false;


  public setToken(token: string): void {
    sessionStorage.setItem(TokenService.TOKEN_JWT, token);
    TokenService.token = token;
  }


  public static get getToken(): string {
    const token = sessionStorage.getItem(TokenService.TOKEN_JWT);
    TokenService.token = TokenService.token || token;
    return TokenService.token || '';
  }

  public static get headersTokenJwt(): { [name: string]: string } {
    return { Authorization: `Bearer ${this.getToken}` };
  }

  public async resetToken(): Promise<void> {
    try {
      if (TokenService?.token && !this.isLogout) {
        this.isLogout = true;
      }
    } catch (error) {
      this.isLogout = false;
    }
    sessionStorage.removeItem(TokenService.TOKEN_JWT);
    TokenService.token = null;
  }

  public static isLogged() {
    return !!TokenService.getToken;
  }
}
