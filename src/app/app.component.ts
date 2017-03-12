import { Component } from '@angular/core';
import {DataService} from "./data.service";

import * as _ from 'lodash'
import * as R from 'ramda'

const without = id => R.reject(R.equals(id))
const toggleListElement = id => R.ifElse(R.contains(id), without(id), R.append(id))
const nonEmptyValues = (l:Object) => _.reject(_.values(l), _.isEmpty)

const getCriteriasInKeywords = food => {
  return _.map(this.selected, (keywords, criteria) => _.includes(keywords, food[criteria]))
}

const filterByFilterable = R.compose(
  R.equals(nonEmptyValues(this.selected).length),
  R.sum,
  getCriteriasInKeywords
)

const filterByTerm = R.compose(
  R.contains(this.search.toLowerCase()),
  R.toLower,
  R.prop('name')
)

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categories: Object[] = [];
  types: Object[] = [];
  food: Object[] = [];
  selected: Object = {};

  search: string = '';

  constructor(private dataService: DataService) {
    this.food = dataService.getFoodList();
    this.categories = dataService.getCategoryList();
    this.types = dataService.getTypeList();

    this.selected = {
      category: [],
      legality: []
    };
  }

  onSearch(term) {
    this.search = term.trim();
    this.filter();
  }

  onClick(id:string, filterBy: string) {
    this.selected = R.evolve({
      [filterBy]: toggleListElement(id)
    })(this.selected);

    this.filter();
  }

  filter() {
    this.food = R.filter(
      R.allPass([filterByFilterable, filterByTerm])
    )(this.dataService.getFoodList())
  }
}
