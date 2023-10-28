import { Component, OnInit } from '@angular/core';
import { BlankService } from 'src/app/services/blank.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private _BlankService:BlankService){}
  brands:any[] = []

  ngOnInit(): void {
    this._BlankService.getBrands().subscribe({
      next:(response) => {
        console.log(response.data)
        this.brands = response.data
      }
    })
  }

}
