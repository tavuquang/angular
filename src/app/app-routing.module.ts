import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { afterLoginGuard, authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [afterLoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [afterLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
