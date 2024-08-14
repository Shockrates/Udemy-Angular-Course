import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './auth/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  key = environment.API_KEY;
  private tokenExpirtationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

 


  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.key}`,
      {
        email: email,
        password:password,
        returnSecureToken:true

      }
    ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.key}`,
      {
        email: email,
        password:password,
        returnSecureToken:true

      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    )
  }

  autoLogin() {
   const userData: {
      email: string;  
      id: string;
    _token: string;  
    _tokenExpirtationDate: Date;
  } = JSON.parse(localStorage.getItem('userData'));

   if (!userData) {
    return;
   }

   const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirtationDate));

   if (loadedUser.token) {
    this.user.next(loadedUser);
    const expirationDuration = new Date(userData._tokenExpirtationDate).getTime() - new Date().getTime()
    this.autologout(expirationDuration);
   }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirtationTimer) {
      clearTimeout(this.tokenExpirtationTimer);
    }
    this.tokenExpirtationTimer = null;
  }

  autologout(expirationDuration: number){
    this.tokenExpirtationTimer = setTimeout(() => {
      this.logout();
    } , expirationDuration)
  }

  private handleAuthentication(email: string, userId:string, token: string, expiresIn: number){
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email, 
      userId, 
      token,
      expirationDate
    );
    this.user.next(user);
    this.autologout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user) );
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessagge = 'An unkown error occured!';
    console.log(errorResp);
    
    if(!errorResp.error || !errorResp.error.error){
      return throwError(errorMessagge);
    }
    switch(errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessagge = 'This email already exists'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessagge = 'You tried to many times.please try again later'
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessagge = 'Invalid email or password'
        break;
      // case 'INVALID_PASSWORD':
      //   errorMessagge = 'Password not match'
      //   break;
    }
    return throwError(errorMessagge);
  }
}


