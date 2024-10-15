import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoginRequest } from './LoginRequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginError:string = "";
  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { 
    this.loginForm = this.formBuilder.group({
    username:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })
  } 
  
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
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error when entering data.");
    }
  }
  
}
