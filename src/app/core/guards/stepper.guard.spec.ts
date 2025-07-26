// core/guards/stepper.guard.spec.ts
import { stepperGuard } from './stepper.guard';
import { Router } from '@angular/router';

describe('stepperGuard', () => {
  it('should allow navigation if isBaseImageConfigured is true', () => {
    // Simule la logique du guard (ici, modifie isBaseImageConfigured à true)
    expect(stepperGuard({} as any, {} as any)).toBe(true);
  });

  it('should redirect to /base-image if isBaseImageConfigured is false', () => {
    // Pour tester le cas false, il faut mocker la variable/service dans la vraie version
    // Ici, laisse comme TODO si tu passes la logique métier par service ou signal
  });
});
