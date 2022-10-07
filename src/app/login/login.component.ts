import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from '../shared/alertService/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  apiEndpoint: string  = environment.BackendApiEndpointSignup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private notifyService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[ Validators.required, Validators.email]],
      password:['',[ Validators.required, Validators.minLength(8)]],
    }, {updateOn: 'change' });
  }
  login(): void{
    localStorage.setItem('isLoggedin', 'true');
     this.http.get<any>(`${this.apiEndpoint}`)
     .subscribe({
      next: res =>{
      const employee = res.find((a: any) =>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(employee){
        this.notifyService.showSuccess("Login success!!");
        this.loginForm.reset();
        this.router.navigate(['employees'])
      } else{
        this.notifyService.showInfo("Emloyee not found")
      }
      },
      error: err => {
        this.notifyService.showError("Something went wrong during Login")
     }
    });
   return
  }
  hideShowPass(){
    this.isText = ! this.isText;
    this.isText? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText? this.type = 'text' : this.type = 'password';
  }
}
