import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService){}
  cartData:any = null ;


  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next:(response) => {
        console.log(response.data)
        this.cartData = response.data
        if(this.cartData.products.length === 0) {
          this.cartData = null
        }
      }
    })
  }

  removeItem(id:string):void{
    this._CartService.removeCartItem(id).subscribe({
      next:(response) => {
        this._CartService.cartNumber.next(response.numOfCartItems)
        this.cartData = response.data
        if(this.cartData.products.length === 0) {
          this.cartData = null
        }
      }
    })
  }

  changeCount(count:number , id:string):void{

    if (count >= 1){

      this ._CartService.updateCart(id , count).subscribe({
        next:(response) => {
          this.cartData = response.data
        }
      })

    }
    
  }

  clear():void {
    this._CartService.clearCart().subscribe ({
      next:(response) => {
        if(response.message === 'success'){
          this.cartData = null;
          this._CartService.cartNumber.next(0)
        }
      }
    })
  }

}
