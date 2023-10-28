import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPassService } from 'src/app/services/forget-pass.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {

  constructor(private _ForgetPassService:ForgetPassService , private _Router:Router , private _ToastrService:ToastrService){}
  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
  email:string = '';

  forgetForm:FormGroup = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email])
  })

  resetCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl ('', [Validators.required])
  })

  resetPasswordForm:FormGroup = new FormGroup({
    newPassword: new FormControl ('' , [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  forgetPassword():void {
    let userEmail = this.forgetForm.value
    this.email = userEmail.email 
    this._ForgetPassService.forgetPassword(userEmail).subscribe({
      next:(response) => {
        console.log(response)
        this._ToastrService.success(response.message)
        this.step1 = false
        this.step2 = true
      },
      error:(err) => {
        this._ToastrService.error(err.error.message)
      }
    })
  }

  resetCode():void{
    let resetCode = this.resetCodeForm.value
    this._ForgetPassService.resetcode(resetCode).subscribe({
      next:(response) => {
        this._ToastrService.success('Reset Code Is True & Sent Successfully')
        this.step2 = false
        this.step3 = true
      },
      error:(err) => {
        this._ToastrService.error(err.error.message)
      }
    })
  }

  newPassword():void{
    let resetForm = this.resetPasswordForm.value 
    resetForm.email = this.email 
    this._ForgetPassService.resetPassword(resetForm).subscribe({
      next:(response) => {
        if(response.token){
          localStorage.setItem('_token' , response.token)
          this._Router.navigate(['/home'])
          this._ToastrService.success('Password Has Changed Successfully')
        }
      },
      error:(err) => {
        this._ToastrService.error(err.error.message)
      }
    })
  }


}
