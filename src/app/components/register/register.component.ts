import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  isLoading:boolean = false;
  errorMsg:string = '';


  registerForm:FormGroup = new FormGroup({
    name:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(''),
    phone:new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , { validators: [this.confirmPassword]} as FormControlOptions);


  
  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if(rePassword?.value === '') {
      rePassword.setErrors({ required : true})
    }

    else if (rePassword?.value !== password?.value){
      rePassword?.setErrors({ misMatch: true})
    }



  }


  handleRegister(){
    this.isLoading = true ;

    if(this.registerForm.valid){
      this._AuthService.registerForm(this.registerForm.value).subscribe(
        {
          next:(response)=>{
            if(response.message === 'success'){
              this._Router.navigate(['/login']);
            }
            this.isLoading = false;
          },
          error:(err) => {
            this.isLoading = false;
            this.errorMsg = err.error.message;
          }
          
        }
      )








    }










  }




  






  }


























