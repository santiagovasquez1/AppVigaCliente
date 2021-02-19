import { AuthUser } from './../models/auth-user.model';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private cookieService: CookieService) { }

  currentUser(): AuthUser {
    const cookieUserValue = this.cookieService.get('userCookie');
    if (cookieUserValue === '') {
      return new AuthUser();
    }
    const user = JSON.parse(cookieUserValue);
    return user;
  }
}
