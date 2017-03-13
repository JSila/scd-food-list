import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {DataService} from "../data.service";

type FoodItem = {
  name:string,
  category:string,
  legality:string,
  comment:string,
}

@Component({
  selector: 'food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  food$: Observable<FoodItem[]>

  constructor(private dataService:DataService) {
    this.food$ = dataService.food$
  }
}
