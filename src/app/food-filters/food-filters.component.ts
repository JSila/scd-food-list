import { Component } from '@angular/core';
import {Subject} from 'rxjs/Subject'
import {DataService} from "../data.service";

@Component({
  selector: 'food-filters',
  templateUrl: './food-filters.component.html',
  styleUrls: ['./food-filters.component.css']
})
export class FoodFiltersComponent {
  filterables: Object[]

  constructor(private dataService:DataService) {
    this.filterables = dataService.filterables
  }

  onSearch(term) {
    this.dataService.term$.next(term)
  }

  onClick(id:string, by: string) {
    this.dataService.filterable$.next({id, by})
  }
}
