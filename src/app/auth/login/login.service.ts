import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './LoginRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor(private http: HttpClient, private router:Router) {
  }

  login(credentials:LoginRequest) : Observable<any>  
  {  
      console.error('Credenciales ', credentials);
      return this.http.post(environment.urlHost+"auth/login", credentials);
      catchError(this.handleError)
  }  

  //getIdToken() {
  //    return this.token;
  //}


  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

}
