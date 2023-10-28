import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService){}
  id:any = '';

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params) =>{
          this.id = params.get('id')
        }
      })
  }

  checkForm:FormGroup = this._FormBuilder.group ({
    details:[''],
    phone:[''],
    city:['']
  })

  handleForm():void {
    const cartDetails = this.checkForm.value 

    this._CartService.checkOut(this.id , cartDetails).subscribe({
      next:(response) => {
        window.open(response.session.url)
      }
    })

  }

}
