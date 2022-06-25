import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { UserStateService } from 'src/app/shared/services/user-state/user-state.service';
import { MatchPasswordValidator } from 'src/app/shared/validators/match-passwords.validator';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInModalComponent implements OnInit {

  @ViewChild('createAccountEmail') createAccountEmail!: ElementRef;
  @ViewChild('signInEmail') signInEmail!: ElementRef;

  destory: Subject<boolean> = new Subject();

  createAccountFormLevelError = this.authenticationService.createAccountFormError$;
  createAccountFormLevelMessage: string = '';
  signInFormLevelMessage: string = '';

  errorMessages: { [key: string]: string } = {
    required: 'Required',
    email: 'Invalid email address',
    invalidPassword: 'At least 6 characters long and contain a number',
    matchPassword: 'Password Mismatch',
    duplicateKey: 'Email has been taken. Choose another or login.',
    signInUnauthorized: `Email or password doesn't match`,
    httpFailure: '😿 Sorry something bad happen. Try again or try refreshing the page.'
  };

  signInFormErrorMessages: { [key: string]: string } = {
    email: '', password: ''
  }

  createAccountFormMessages: { [key: string]: string } = {
    email: '', password: '', confirmPassword: ''
  }

  showCreateAccount: boolean = false;
  createAccountFormLoading: boolean = false;

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator()]]
  });

  createAccountForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator()]],
    confirmPassword: ['', Validators.required],
  }, { validators: MatchPasswordValidator('confirmPassword', 'password')});

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<SignInModalComponent>,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userStateService: UserStateService
  ) { }

  ngOnInit(): void {
    this.initSignForm();
    this.initCreateAccountForm();
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  initSignForm(): void {
    this.signInForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.signInForm, this.signInFormErrorMessages));
  
    this.authenticationService.signInFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {      
      this.requestInProgress();
      if(error === HttpStatusCode.Unauthorized) {
        this.signInForm.get('email')?.setErrors({ signInUnauthorized: true });
        this.signInEmail.nativeElement.focus();
      } else {
        this.signInFormLevelMessage = this.errorMessages['httpFailure'];
        this.changeDetectorRef.markForCheck();
      }
    });
    
    this.authenticationService.signInFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((user) => this.signSuccuessful(user));
  }

  initCreateAccountForm() {
    this.createAccountForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.createAccountForm, this.createAccountFormMessages));

    this.authenticationService.createAccountFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {      
      this.requestInProgress();
      if(error === HttpStatusCode.Conflict) {
        this.createAccountForm.get('email')?.setErrors({ duplicateKey: true });
        this.createAccountEmail.nativeElement.focus();
      } else {
        this.createAccountFormLevelMessage = this.errorMessages['httpFailure'];
        this.changeDetectorRef.markForCheck();
      }
    });

    this.authenticationService.createAccountFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((user) => this.signSuccuessful(user));
  }

  signInClick(): void {
    this.requestInProgress(true);
    this.authenticationService.signIn(this.signInForm.value);    
  }

  createAccountClick(): void {
    this.requestInProgress(true);
    this.authenticationService.createAccount(this.createAccountForm.value);
  }

  signSuccuessful(whatever: any): void {
    this.requestInProgress();
    this.userStateService.setUser(whatever);
    this.dialogRef.close();
  }

  requestInProgress(predicate: boolean = false) {
    this.createAccountFormLoading = predicate;
    this.dialogRef.disableClose = predicate;
  }

  setErrorsMessages(formGroup: FormGroup, formControlMessages: { [key: string]: string }): void {
    Object.keys(formGroup.controls).forEach(element => {
      const errors = formGroup.get(element)?.errors;
      if(errors) {         
        const error = Object.keys(errors)[0];
        formControlMessages[element] = this.errorMessages[error];
      }
    });
  }
}
