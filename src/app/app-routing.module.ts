import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'' , component:BlankLayoutComponent , children:[
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    {path:'home' ,canActivate:[authGuard] , component:HomeComponent , title:'Home'},
    {path:'cart' , canActivate:[authGuard] , component:CartComponent , title:'Cart'},
    {path:'products' ,canActivate:[authGuard] , component:ProductsComponent , title:'Products'},
    {path:'details/:id' ,canActivate:[authGuard] , component:DetailsComponent , title:'Details'},
    {path:'payment/:id' ,canActivate:[authGuard] , component:PaymentComponent , title:'Payment'},
    {path:'categories' ,canActivate:[authGuard] , component:CategoriesComponent , title:'Categories'},
    {path:'forgetpassword' ,canActivate:[authGuard] , component:ForgetpasswordComponent , title:'ForgetPassword'},
    {path:'brands' ,canActivate:[authGuard] , component:BrandsComponent , title:'Brands'},
    {path:'wishlist' ,canActivate:[authGuard] , component:WishlistComponent , title:'WishList'},
  ]},
  {path:'' , component:AuthLayoutComponent , children:[
    {path:'login' , component:LoginComponent , title:'Login'},
    {path:'register' , component:RegisterComponent , title:'Register'},
    {path:'forget' , component:ForgetpasswordComponent , title:'ForgetPassword'}
  ]},
  {path:'**' , component:NotfoundComponent , title:'NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
