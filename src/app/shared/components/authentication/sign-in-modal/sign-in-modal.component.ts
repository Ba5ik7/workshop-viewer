import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInModalComponent implements OnInit {

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email ]],
    password: ['', [Validators.required, Validators.minLength(5) ]]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { }

  signInClick(): void {
    console.log(this.signInForm.value);
    
  }

}
