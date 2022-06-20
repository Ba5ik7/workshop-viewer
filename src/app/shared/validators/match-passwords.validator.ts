import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
    
export function MatchPasswordValidator(controlName: string, toMatchControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlOne: AbstractControl|null = control.get(controlName);
    const controlTwo: AbstractControl|null = control.get(toMatchControlName);
    const error: boolean = (controlOne && controlTwo && controlOne?.value !== controlTwo?.value) ?? false;
    const validatorFn = {
      matchPassword: {
        value: {
          controlOne: controlOne?.value,
          controlTwo: controlTwo?.value
        }
      }
    };
    controlOne?.setErrors(error ? validatorFn : null);
    return  error ? validatorFn : null;
  };
}
