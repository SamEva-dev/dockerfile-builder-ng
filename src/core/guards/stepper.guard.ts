import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const stepperGuard: CanActivateFn = (route, state) => {

    const isBaseImageConfigured = true; 

  if (isBaseImageConfigured) {
    return true;
  }
  
  return inject(Router).createUrlTree(['/base-image']);
};
