import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.unique_name);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/User`, { email, password }, { responseType: 'text' }).pipe(map((token: any) => {
      if (token) {
        localStorage.setItem(this._tokenKey, token);
        this._user$.next(email);
        return true;
      } else {
        return false;
      }
    }))
  }
  register(username: string, password: string, email: string): Observable<boolean> {
    console.log(username)
    return this.http.post(`${environment.apiUrl}/User/register`, { username, password, email, passwordConfirmation: password },
      { responseType: 'text' }).pipe(
        map((token: any) => {
          console.log(token)
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(username);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem('currentuser');
      this._user$.next(null);
    }
  }

  checkUserNameAvailability = (username: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/User/checkusername`,
      {
        params: { username }
      }
    )
  }


  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }
}
function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}