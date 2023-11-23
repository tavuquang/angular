import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  minPw = 8;

  constructor(private _fb: FormBuilder, private authService: AuthService, private _coreService: CoreService,
    private router: Router) {
    this.registerForm = this._fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validators: this.MustMatch('password', 'confirmPassword')
      });
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      // console.log(formGroup);
      const password = formGroup.controls[controlName];
      const confirmPassword = formGroup.controls[matchingControlName]
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ MustMatch: true })
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData).subscribe({
      next: (val: any) => {
        this._coreService.openSnackBar('Register successfully');
        this.router.navigate(['login']);
        console.log(val);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
