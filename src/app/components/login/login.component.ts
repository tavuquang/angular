import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  minPw = 8;

  constructor(private _fb: FormBuilder, private authService: AuthService,
    private router: Router, private coreService: CoreService) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() { return this.loginForm.get('password'); }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email).subscribe({
      next: (val) => {
        if (val.length > 0 && val[0].password === password) {
          localStorage.setItem('email', email);
          this.router.navigate(['/employee']);
        } else {
          this.coreService.openSnackBar('Email or password went wrong', 'Failure');
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
