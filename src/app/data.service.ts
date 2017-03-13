import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {combineLatest} from 'rxjs/observable/combineLatest'

import * as R from 'ramda'
import * as _ from 'lodash'

import FOOD_LIST from '../assets/food-list'
import FILTERABLES from '../assets/filterables'

type FoodItem = {
  name:string,
  category:string,
  legality:string,
  comment?:string,
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

const createFilterableFilter = selected => R.compose(
  R.equals(nonEmptyValues(selected).length),
  R.sum,
  getCriteriasInKeywords(selected)
)

const updateSelectedFilters = (selected: Object, filter: Filter) => R.evolve({
  [filter.by]: toggleListElement(filter.id)
})(selected)

const createTermFilter = (term: string) => R.compose(R.contains(term), R.toLower, R.prop('name'))

const collectFilters = (...filters) => filters

const applyFiltersToList = R.curry((foodList: FoodItem[], filters: R.Pred[]) => R.filter(R.allPass(filters), foodList))

@Injectable()
export class DataService {
  foodList: FoodItem[] = []
  filterables: Object[] = []
  selectedFilters: Object = {}

  food$: Observable<FoodItem[]>
  term$: Subject<string>
  filterable$: Subject<Filter>

  constructor() {
    this.foodList = sort(FOOD_LIST, 'name');
    this.filterables = sort(FILTERABLES, 'label');

    this.selectedFilters = R.compose(
      R.fromPairs,
      R.map((f:any): any[] => [f, []]),
      R.pluck('id')
    )(this.filterables)

    this.term$ = new Subject<string>()
    this.filterable$ = new Subject<Filter>()

    this.food$ = this.filter()
  }

  filterByTerm(term: Subject<string>): Observable<FilterFunction> {
    return term.map(createTermFilter)
  }

  filterByFilterable(filterable: Subject<Filter>): Observable<FilterFunction> {
    return filterable
      .scan(updateSelectedFilters, this.selectedFilters)
      .map(createFilterableFilter)
  }

  filter(): Observable<FoodItem[]> {
    return combineLatest(
        this.filterByTerm(this.term$).startWith(p => true),
        this.filterByFilterable(this.filterable$).startWith(p => true)
      )
      .map(applyFiltersToList(this.foodList))
  }
}
