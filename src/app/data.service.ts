import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {merge} from 'rxjs/observable/merge'

import * as R from 'ramda'
import * as _ from 'lodash'

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

type FilterFunction = (food: string) => boolean

const sort = (list, by) => list.sort((a,b) => +(a[by] > b[by]))
const without = id => R.reject(R.equals(id))
const toggleListElement = id => R.ifElse(R.contains(id), without(id), R.append(id))
const nonEmptyValues = (l:Object) => _.reject(_.values(l), _.isEmpty)

const getCriteriasInKeywords = selected => food => {
  return _.map(selected, (keywords, criteria) => _.includes(keywords, food[criteria]))
}

@Injectable()
export class DataService {
  foodList: FoodItem[] = [];
  types: Filterable[] = [];
  categories: Filterable[] = [];
  filterables: string[] = [];
  selected: Object = {};

  constructor() {
    this.foodList = sort([
      {name: 'Apple', category: 'fruits', legality: 'legal', comment: undefined},
      {name: 'Broccoli', category: 'vegetables', legality: 'legal', comment: undefined},
      {name: 'Oats', category: 'vegetables', legality: 'illegal', comment: undefined},
      {name: 'Grapefruit juice', category: 'beverages', legality: 'illegal', comment: "Only legal if fresh. Frozen, or canned grapefruit juice is not allowed. Juice should be diluted with water before drinking."},
    ], 'name')

    this.types = sort([
      {id:'legal', label: 'Legal'},
      {id:'illegal', label: 'Illegal'}
    ], 'label')

    this.categories = sort([
      {id:'vegetables', label: 'Vegetables'},
      {id:'fruits', label: 'Fruits'},
      {id:'meats', label: 'Meats'},
      {id:'beverages', label: 'Beverages'},
      //...
    ], 'label')

    this.filterables = ['category', 'legality']

    this.selected = R.compose(
      R.fromPairs,
      R.map((f:any): any[] => {
        return [f, []]
      })
    )(this.filterables)
  }

  getTypeList(): Filterable[] {
    return this.types
  }

  getCategoryList(): Filterable[] {
    return this.categories
  }

  // the following two functions returns test function for a food item
  filterByTerm(term: Subject<string>): Observable<FilterFunction> {
    return term
      .map(term => R.compose(R.contains(term), R.toLower, R.prop('name')))
  }

  filterByFilterable(filterable: Subject<Filter>): Observable<FilterFunction> {
    return filterable
      .scan((selected: Object, filter: Filter) => {
        return R.evolve({
          [filter.by]: toggleListElement(filter.id)
        })(selected)
      }, this.selected)
      .map(selected => {
        return R.compose(
          R.equals(nonEmptyValues(selected).length),
          R.sum,
          getCriteriasInKeywords(selected)
        )
      })
  }

  filter(term: Subject<string>, filterable: Subject<Filter>): Observable<FoodItem[]> {
    return merge(this.filterByTerm(term), this.filterByFilterable(filterable))
      .combineLatest((...filters) => filters)
      .map(
        filters => R.filter(R.allPass(filters))(this.foodList)
      )
      .startWith(this.foodList)
  }
}
