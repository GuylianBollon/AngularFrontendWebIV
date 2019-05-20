import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../user/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.sass']
})
export class MainNavComponent implements OnInit {

  loggedInUser$ = this._authenticationService.user$;
  constructor(private _authenticationService: AuthenticationService) { }

  ngOnInit() {

  }

  logout() {
    this._authenticationService.logout();
  }

}
