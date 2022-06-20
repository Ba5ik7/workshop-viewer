import { ChangeDetectionStrategy, Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'better-mat-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {

  @Input() helperText!: string;
  @Input() helperTextClasses!: string;

  @Input() labelClasses!: string;
  @Input() labelText: string = 'Label Text Default';

  @Input() inputId!: string;
  @Input() inputType: string = 'text';
  @Input() inputClasses: string = 'validate';

  @Input() wrapperClasses: string = '';

  @Input() maskPattern: string = '';

  isActive!: boolean;

  error!: string;
  escalateMsg: boolean = true;
  value!: string;
  onChange!: () => void;
  onTouched!: () => void;
  disabled!: boolean;
  valid: boolean = true;

  destory: Subject<boolean> = new Subject();

  constructor(@Self() private controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    this.controlDir.valueChanges
    ?.pipe(takeUntil(this.destory))
    .subscribe((val) => this.valueChange(val));    
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  valueChange(val: any): void {
    this.valid = this.controlDir.control?.status !== 'INVALID';
    if(this.valid === false) {
      const errorsMessages: any = this.getValidatorErrorMessage(this.controlDir.errors);
      this.error = errorsMessages[0];
    }
  }

  writeValue(value: string): void {
    this.value = value ? value : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur(event: any): void {
    this.isActive = event.target.value !== '';
    this.escalateMsg = this.valid === false;
    this.onTouched();
  }

  onFocus(): void {
    this.isActive = true;
    this.escalateMsg = false;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getValidatorErrorMessage(validatorObj?: any): string[] {
    let errors: string[] = [];
    const errorMessages: { [key: string]: string } = {
      required: 'Required',
      invalidPhone: 'Is invalid phone number format.',
      invalidName: 'Must contain ONLY letters.',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorObj.requiredLength}`
    };

    Object.keys(validatorObj)
    .forEach(err => errors.push(errorMessages[err]));

    return errors;
  }
}
