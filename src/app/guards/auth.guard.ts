import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';

export const authGuard: CanActivateFn = (route, state) => {

  if(inject(UsersService).getCurrentUser() == null)
  {
    inject(Router).navigate(['/sign-in']);
    return false;
  }

  return true;

};
