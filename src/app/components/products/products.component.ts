import { Component, OnInit } from '@angular/core';
import { BlankService } from 'src/app/services/blank.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{


  constructor(private _BlankService:BlankService , private _CartService:CartService , 
    private _ToastrService:ToastrService , private _WishlistService:WishlistService){}

  productData:any[] = []
  term:string = '';
  wishListData:string[] = []

  ngOnInit(): void {
    this._BlankService.getProduct().subscribe({
      next:(response) =>{
        console.log(response)
        this.productData = response.data;
      }
    })

    this._WishlistService.getWishList().subscribe ({
      next:(response) => {
        const newData = response.data.map((item:any)=> item._id)
        this.wishListData = newData
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
        }
      })
    }

}
