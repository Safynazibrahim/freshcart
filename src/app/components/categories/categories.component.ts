import { Component, OnInit } from '@angular/core';
import { BlankService } from 'src/app/services/blank.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  constructor (private _BlankService:BlankService){}
  categories:any[] = []

  ngOnInit(): void {
      this._BlankService.getCategories().subscribe({
        next:(response) => {
          console.log(response.data)
          this.categories = response.data
        }
      })
  }

}
