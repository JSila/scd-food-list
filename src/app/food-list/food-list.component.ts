import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable'

type FoodItem = {
  name:string,
  category:string,
  legality:string,
  comment:string,
}

@Component({
  selector: 'food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  inputs: ['food']
})
export class FoodListComponent {
  food: Observable<FoodItem[]>;

  constructor() { }
}
