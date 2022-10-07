import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './component/department/department.component';
import { DesignationComponent } from './component/designation/designation.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { PayrollComponent } from './component/payroll/payroll.component';
import { StatusComponent } from './component/status/status.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {path:'employees' ,component: EmployeesComponent},
  {path:'department' ,component: DepartmentComponent},
  {path:'designation' ,component: DesignationComponent},
  {path:'status' ,component: StatusComponent },
  {path:'payroll' ,component: PayrollComponent},
  {path: '', redirectTo: 'component/employees', pathMatch: 'full',},
  {path: '', redirectTo: 'component/designation', pathMatch: 'full',},
  {path: '', redirectTo: 'component/department', pathMatch: 'full',},
  {path: '', redirectTo: 'component/status', pathMatch: 'full',},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
