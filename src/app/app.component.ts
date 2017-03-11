import { Component } from '@angular/core';
import {DataService} from "./data.service";

import * as _ from 'lodash'

const push = (array, value) => {
  array.push(value)
}

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
    if (_.includes(this.selected[filterBy], id)) {
      _.pull(this.selected[filterBy], id)
    } else {
      push(this.selected[filterBy], id)
    }
    this.filter();
  }

  filter() {
    this.food = _.filter(this.dataService.getFoodList(), food => {
      let includes: boolean[] = _.map(this.selected, (keywords, criteria) => {
        return keywords.includes(food[criteria])
      });
      return _.sum(includes) === _.reject(_.values(this.selected), _.isEmpty).length
    }).filter(food => _.includes(_.toLower(food.name), _.toLower(this.search)));
  }
}
