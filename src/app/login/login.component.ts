import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private login: FormBuilder, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.login.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.get('email')?.value == "admin@gmail.com" && this.loginForm.get('password')?.value == "123456") {
      this._snackBar.open('Login Successfully', 'OK', {
        duration: 3000,
      });
      this.router.navigate(['/', 'home']);
    }
    else {
      this._snackBar.open('Wrong ID or Password, Please try again.', 'OK', {
        duration: 3000,
      });

    }
  }
}
