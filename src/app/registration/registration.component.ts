import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray  } from '@angular/forms';
import { RegestrationService } from '../services/regestration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegestrationService]
})
export class RegistrationComponent implements OnInit {
  public userRegistrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private regestrationService: RegestrationService
  ) { }

  ngOnInit() {
    this.userRegistrationForm = this.fb.group({
      name:  ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      cfm_pwd: ['', [Validators.required]],
    });
  }

  addUser() {
    this.regestrationService.addUser(this.userRegistrationForm.value)
    .subscribe(res => {
        this.userRegistrationForm.reset();
      }, (err) => {
        console.log(err);
      });
  }
}
