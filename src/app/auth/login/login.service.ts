import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './LoginRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor(private router:Router) {
  }

 

  login(email:string, password:string) {
      
  }

  //getIdToken() {
  //    return this.token;
  //}

}
