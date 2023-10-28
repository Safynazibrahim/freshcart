import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor (private _WishlistService:WishlistService , private _CartService:CartService , private _ToastrService:ToastrService){}
  productData:any = null
  wishListData:any[] = []

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next:(response) => {
        this.productData = response.data
        const newData = response.data.map((item:any)=> item._id)
        this.wishListData = newData
        console.log('productData' , this.productData.length)
        if(this.productData.length === 0) {
          this.productData = null
        }
      }
    
    })

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
        const newProductsData = this.productData.filter( (item:any) => this.wishListData.includes(item._id) )
        this.productData = newProductsData
        if(this.productData.length === 0) {
          this.productData = null
        }
        }
      })
  }


}
