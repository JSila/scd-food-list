import { Component } from '@angular/core';
import { DataService } from "./data.service";

import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'

type FoodItem = {
  name:string,
  category:string,
  legality:string,
  comment:string,
}

type Filterable = {
  id: string,
  label: string
}

type Filter = {
  id: string,
  by: string
}

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categories: Filterable[] = []
  types: Filterable[] = []

  food: Observable<FoodItem[]>
  term: Subject<string>
  filterable: Subject<Filter>

  constructor(private dataService: DataService) {
    this.categories = dataService.getCategoryList()
    this.types = dataService.getTypeList()

    this.term = new Subject<string>()
    this.filterable = new Subject<Filter>()

    this.food = dataService.filter(this.term, this.filterable)
  }

  onSearch(term) {
    this.term.next(term)
  }

  onClick(id:string, by: string) {
    this.filterable.next({id, by})
  }
}
