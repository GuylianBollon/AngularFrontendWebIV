import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMg: string;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-z]*[A-Z]*[0-9]*[^a-zA-Z0-9]')]],
          confirmPassword: ['', Validators.required]
        },
        { validator: comparePasswords }
      ),
      email: ['', [Validators.required, Validators.email]]
    });
  }
  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    } else if (errors.minLength) {
      return `needs at least ${errors.minLength.requiredLength} characters (got ${errors.minLength.actualLength})`
    } else if (errors.userAlreadyExists) {
      return `user already exists`;
    } else if (errors.email) {
      return `not a valid e-mail`;
    } else if (errors.passwordsDiffer) {
      return `passwords are not the same`;
    }
  }

  onSubmit() {
    this.authService.register(
      this.user.value.username,
      this.user.value.passwordGroup.password,
      this.user.value.email
    ).subscribe(
      val => {
        if (val) {
          if (this.authService.redirectUrl) {
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.authService.redirectUrl = undefined;
          } else {
            this.router.navigate(['']);
          }
        } else {
          this.errorMg = `Could not login`;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          this.errorMg = `Error while trying to register user ${this.user.value.email}:${err.error.message}`;
        } else {
          this.errorMg = `Error ${err.status} while trying to register user ${this.user.value.email}:${err.error}`;
        }
      }
    )
  }
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null
    : { 'passwordsDiffer': true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    )
  }
}