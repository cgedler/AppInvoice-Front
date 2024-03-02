import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/auth/login/login.service';
import { LoginRequest } from './loginrequest.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private loginService:LoginService) { } 

  ngOnInit(): void {
  }

  //NgForm captura lo que viene del formulario
  login(form:NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let loginRequest = new LoginRequest(email,password);
    console.error('Credenciales ', form.value.email);
    //console.error('Credenciales ', loginRequest.username.toString + "");
    //this.loginService.login(loginRequest);
  }


}
