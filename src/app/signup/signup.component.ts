import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from '../shared/alertService/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  apiEndpoint: string  = environment.BackendApiEndpointSignup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private notifyService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['',[ Validators.required, Validators.minLength(4)]],
      mobileNo: ['', [ Validators.required, Validators.minLength(10)]],
      email:['',[ Validators.required, Validators.email]],
      password:['', [ Validators.required, Validators.minLength(8)]],
    });
  }

  signup(){
    this.http.post<any>(`${this.apiEndpoint}`, this.signupForm.value)
    .subscribe({
      next: res => {
      this.notifyService.showSuccess("Signup successfully!!");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },
    error: error => {
      this.notifyService.showError("something went wrong during signup")
    }
  });
  }
  hideShowPass(){
    this.isText = ! this.isText;
    this.isText? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText? this.type = 'text' : this.type = 'password';
  }
}


