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
import { DataTablesModule } from 'angular-datatables';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
//
import { JwtInterceptorService } from './auth/login/jwt-interceptor.service';
import { ErrorInterceptorService } from './auth/login/error-interceptor.service';
import { LoginComponent } from '../app/auth/login/login.component';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';
import { NavComponent } from '../app/shared/nav/nav.component';
import { FooterComponent } from '../app/shared/footer/footer.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { RegisterComponent } from '../app/auth/register/register.component';
import { CategoryComponent } from '../app/pages/category/category.component';
import { FormCategoryComponent } from '../app/pages/category/form-category.component';
import { BankComponent } from './pages/bank/bank.component';
import { FormBankComponent } from './pages/bank/form-bank.component';
import { BillingComponent } from './pages/billing/billing.component';
import { FormBillingComponent } from './pages/billing/form-billing.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { FormCustomersComponent } from './pages/customers/form-customers.component';
import { FormItemsComponent } from './pages/items/form-items.component';
import { ItemsComponent } from './pages/items/items.component';
import { FormSellersComponent } from './pages/sellers/form-sellers.component';
import { SellersComponent } from './pages/sellers/sellers.component';
import { FormShoppingComponent } from './pages/shopping/form-shopping.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { FormSuppliersComponent } from './pages/suppliers/form-suppliers.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { FormTaxesComponent } from './pages/taxes/form-taxes.component';
import { TaxesComponent } from './pages/taxes/taxes.component';

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
    FormCategoryComponent,
    BankComponent,
    FormBankComponent,
    BillingComponent,
    FormBillingComponent,
    CustomersComponent,
    FormCustomersComponent,
    ItemsComponent,
    FormItemsComponent,
    SellersComponent,
    FormSellersComponent,
    ShoppingComponent,
    FormShoppingComponent,
    SuppliersComponent,
    FormSuppliersComponent,
    TaxesComponent,
    FormTaxesComponent
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
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule
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
