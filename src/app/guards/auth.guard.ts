import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('email')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['/login']);
  }
};

export const afterLoginGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('email')) {
    const router = inject(Router);
    return router.navigate(['/employee']);;
  } else {
    return true;
  }
};  