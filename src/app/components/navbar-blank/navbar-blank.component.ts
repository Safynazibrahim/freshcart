import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit {

  constructor(private _Router:Router , private _CartService:CartService , private _Renderer2:Renderer2){}

  @ViewChild('navBar') navElement!:ElementRef
  @HostListener('window:scroll')
  onScroll():void {
    if(scrollY > 500){
      this._Renderer2.addClass(this.navElement.nativeElement , 'px-5')
      this._Renderer2.addClass(this.navElement.nativeElement , 'shadow')
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement , 'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement , 'shadow')
    }
  }

  cartCount:number = 0 

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data) => {
        this.cartCount = data;
      },
    });

    this._CartService.getCart().subscribe({
      next:(response) => {
        this.cartCount = response.numOfCartItems
      },
    })

  }

  signOut():void {
    localStorage.removeItem('_token');
    this._Router.navigate(['/login']);
  }
}
