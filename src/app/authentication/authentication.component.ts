import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray  } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [AuthenticationService]
})
export class AuthenticationComponent implements OnInit {
  public loginUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginUserForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  loginUser() {
    this.authenticationService.loginUser(this.loginUserForm.value)
    .subscribe(res => {
        this.loginUserForm.reset();
        console.log(res);
      }, (err) => {
        console.log(err);
    });
  }

}
