import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)


  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
    {
      productId: prodId
    }
    )

  }

  getCart():Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  removeCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , 

    )
  }

  updateCart(id:string , countItem:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , 
    { count: countItem},
    )
  }

  checkOut(cartId:string , orderDetails:object):Observable <any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200` , 
    {
      shippingAddress: orderDetails
    }
    )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` , 

    )
  }
}
