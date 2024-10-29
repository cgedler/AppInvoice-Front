import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { CategoryComponent } from './pages/category/category.component';
import { FormCategoryComponent } from './pages/category/form-category.component';
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

export const routes: Routes = [ {path:'',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'category',component:CategoryComponent},
  {path:'category/form',component:FormCategoryComponent},
  {path:'category/form/:id',component:FormCategoryComponent},
  {path:'bank',component:BankComponent},
  {path:'bank/form',component:FormBankComponent},
  {path:'bank/form/:id',component:FormBankComponent},
  {path:'billing',component:BillingComponent},
  {path:'billing/form',component:FormBillingComponent},
  {path:'billing/form/:id',component:FormBillingComponent},
  {path:'customers',component:CustomersComponent},
  {path:'customers/form',component:FormCustomersComponent},
  {path:'customers/form/:id',component:FormCustomersComponent},
  {path:'items',component:ItemsComponent},
  {path:'items/form',component:FormItemsComponent},
  {path:'items/form/:id',component:FormItemsComponent},
  {path:'sellers',component:SellersComponent},
  {path:'sellers/form',component:FormSellersComponent},
  {path:'sellers/form/:id',component:FormSellersComponent},
  {path:'shopping',component:ShoppingComponent},
  {path:'shopping/form',component:FormShoppingComponent},
  {path:'shopping/form/:id',component:FormShoppingComponent},
  {path:'suppliers',component:SuppliersComponent},
  {path:'suppliers/form',component:FormSuppliersComponent},
  {path:'suppliers/form/:id',component:FormSuppliersComponent},
  {path:'taxes',component:TaxesComponent},
  {path:'taxes/form',component:FormTaxesComponent},
  {path:'taxes/form/:id',component:FormTaxesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }