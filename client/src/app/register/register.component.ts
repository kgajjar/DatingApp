import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Input decorator to receive parent communication
  //@Input() usersFromHomeComponent: any;
  //Output decorator to send communication to parent. EventEmitter class.
  @Output() cancelRegistration = new EventEmitter();//EventEmitter allows us to emit value back to parent
  model: any = {};

  //Reactive Forms: Tracks the value and validity state of a group of form control instances.
  registerForm: FormGroup;


  //Inject account service in here.
  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    //Init Reactive Form
    this.initializeForm();
  }

  initializeForm() {
    //Reactive Forms: Initialize form
    //this.fb.group - using form builder service instead
    this.registerForm = this.fb.group({
      //Here we specify form fields that we want to validate
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
      this.matchValues('password')//Compare to password
      ]]
    });

    /*Problem: If we change password after we've already validated
      1) The password will show up as Valid. We fix this like this.
    */
    //Here we subscribe to the value changes
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      //So when password/confirmPassword, or either changes we will update the validity of that field against the confirm password field again.
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })

  }

  /*Custom validator
  What are we doing?
  1) We are getting access to control we want to access this validator to
  2) We attach it to our confirm password control
  3) control?.value - is our confirmPassword control
  4) We go up and compare this to whatever we pass into the matchTo in - matchValues(matchTo: string): ValidatorFn
  5) We are passing in the password
  6) If passwords match - we return null [PASSED Validator]
  7) else we attach a validation error called isMatching to the control to fail form validation
  */
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      //This gives us access to all controls in form
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }//passing in what we are going to be matching this to.
    }
  }

  register() {
    //Reactive Forms: Contains the values for all of these Form Controls
    console.log(this.registerForm.value);

    //this.accountService.register(this.model).subscribe(response => {

    //  console.log(response);

    //  this.cancel();
    //}, error => {
    //  //Output toastr
    //  this.toastr.error(error.error);
    //});
    //console.log(this.model);
  }

  cancel() {
    //Emit a value using event emiitter. Sending value "false" to parent
    this.cancelRegistration.emit(false);
  }

}
