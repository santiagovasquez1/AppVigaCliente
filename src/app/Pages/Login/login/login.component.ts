import { AuthUser } from './../../../models/auth-user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = 'disenioflexion';

  model = {
    user: '',
    password: ''
  };

  constructor(private route: Router, private cookieService: CookieService) {

  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.model);
    if (this.model.user === 'Admin' && this.model.password === 'password123') {
      const user = new AuthUser();
      user.isAuthorize = true;
      user.userName = this.model.user;
      this.cookieService.set('userCookie', JSON.stringify(user), {
        sameSite: 'Lax'
      });

      this.route.navigate(['disenioflexion']);
    }

  }

}
