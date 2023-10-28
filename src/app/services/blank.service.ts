import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlankService {

  constructor(private _HttpClient:HttpClient) { }

  getProduct():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getProductId(id:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  getCategories():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  getBrands():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

}
