import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { CuttextPipe } from './cuttext.pipe';
import { DetailsComponent } from './components/details/details.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PaymentComponent } from './components/payment/payment.component';
import { ToastrModule } from 'ngx-toastr';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { SearchPipe } from './search.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './loading.interceptor';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CategoriesComponent,
    BrandsComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NavbarBlankComponent,
    NavbarAuthComponent,
    BlankLayoutComponent,
    AuthLayoutComponent,
    NotfoundComponent,
    CuttextPipe,
    DetailsComponent,
    PaymentComponent,
    SearchPipe,
    ForgetpasswordComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxSpinnerModule,
  ],
  providers: [
  {provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor , multi:true },
  {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
