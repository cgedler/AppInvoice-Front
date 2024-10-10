import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/auth/login/login.service';
import { LoginRequest } from './LoginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string = "";
  loginForm = this.formBuilder.group({
    username:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })
  
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { } 

  ngOnInit(): void {
  }

  get username(){
    return this.loginForm.controls['username'];
  }

  get password()
  {
    return this.loginForm.controls['password'];
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Complete login");
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
          this.loginService.userName = this.loginForm.username.value;
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error when entering data.");
    }
  }

}
