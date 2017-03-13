import { Component } from '@angular/core';
import {Subject} from 'rxjs/Subject'

type Filter = {
  id: string,
  by: string
}

@Component({
  selector: 'food-filters',
  templateUrl: './food-filters.component.html',
  styleUrls: ['./food-filters.component.css'],
  inputs: ['filterables', 'term', 'filterable']
})
export class FoodFiltersComponent {
  filterables: Object[]
  term: Subject<string>
  filterable: Subject<Filter>

  onSearch(term) {
    this.term.next(term)
  }

  onClick(id:string, by: string) {
    this.filterable.next({id, by})
  }
}
