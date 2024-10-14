import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './auth/login/jwt-interceptor.service';
import { ErrorInterceptorService } from './auth/login/error-interceptor.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

import { LoginComponent } from '../app/auth/login/login.component';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';
import { NavComponent } from '../app/shared/nav/nav.component';
import { FooterComponent } from '../app/shared/footer/footer.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { RegisterComponent } from '../app/auth/register/register.component';
import { CategoryComponent } from '../app/pages/category/category.component';
import { FormCategoryComponent } from '../app/pages/category/form-category.component';

import { DataTablesModule } from 'angular-datatables';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent, 
    HomeComponent,
    RegisterComponent,
    CategoryComponent,
    FormCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule,
    DataTablesModule,
    MatTableModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
