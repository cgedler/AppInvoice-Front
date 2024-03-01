import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
//import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  //{path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path:'',component:HomeComponent},
  //{path:'inicio',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  //{path:'signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }