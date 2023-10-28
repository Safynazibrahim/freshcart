import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BlankService } from 'src/app/services/blank.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  constructor(private _BlankService:BlankService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishlistService:WishlistService){}
  productData:any[] = []
  categories:any[]= []
  term:string = '';
  wishListData:string[] = []

  ngOnInit(): void {
    this._BlankService.getProduct().subscribe({ 
      next:(response) => {
        this.productData = response.data 
      },
    }) 


    this._BlankService.getCategories().subscribe({
      next:(response)=> {
        console.log(response.data)
      this.categories = response.data
      }
    })

    this._WishlistService.getWishList().subscribe ({
      next:(response) => {
        const newData = response.data.map((item:any)=> item._id)
        this.wishListData = newData
      }
    })
  }

  catSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  addProduct(id:string):void{
   this._CartService.addToCart(id).subscribe({
    next:(response) =>{
      this._CartService.cartNumber.next(response.numOfCartItems)
      console.log(response)
      this._ToastrService.success(response.message)
    }
   })

  }

  addFav(prodId:string):void {
  this._WishlistService.addToWishList(prodId).subscribe({
    next:(response)=> {
      console.log(response)
      this._ToastrService.success(response.message)
      this.wishListData = response.data 
    }
  })
  }
  
  removeFav(prodId:string):void {
    this._WishlistService.removeWishList(prodId).subscribe({
      next:(response)=> {
        console.log(response)
        this._ToastrService.success(response.message)
        this.wishListData = response.data
      }
    })
  }

}
