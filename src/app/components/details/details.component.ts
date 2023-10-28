import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { BlankService } from 'src/app/services/blank.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
 

  constructor(private _ActivatedRoute:ActivatedRoute , private _BlankService:BlankService , private _CartService:CartService ,  private _ToastrService:ToastrService){}

  productId:any;
  productDetails:any = {};
 
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param) =>{
          this.productId = param.get('id')
          console.log(param)
        }
      });

      this._BlankService.getProductId(this.productId).subscribe({
        next:(response) =>{
         this.productDetails = response.data;
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

  productImages: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navText: ['', ''],
    items:1,
    nav: false
  }
}
