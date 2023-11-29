import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    canActivate: [afterLoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule),
    canActivate: [afterLoginGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./components/list/list.module').then(m => m.ListModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
