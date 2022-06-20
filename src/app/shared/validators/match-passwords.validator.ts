import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
    
export function MatchPasswordValidator(controlName: string, toMatchControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const matches = control.get(toMatchControlName)?.value !== control.get(controlName)?.value;
    return matches ? { matching: { value: control.value } } : null;
  };
}
