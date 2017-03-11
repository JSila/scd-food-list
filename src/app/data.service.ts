import { Injectable } from '@angular/core';

type FoodItem = {
  name:string,
  category:string,
  legality:string,
  comment:string,
}

const sort = (list, by) => list.sort((a,b) => +(a[by] > b[by]))

@Injectable()
export class DataService {

  constructor() { }

  getFoodList() {
    return sort([
      {name: 'Apple', category: 'fruits', legality: 'legal', comment: undefined},
      {name: 'Broccoli', category: 'vegetables', legality: 'legal', comment: undefined},
      {name: 'Oats', category: 'vegetables', legality: 'illegal', comment: undefined},
      {name: 'Grapefruit juice', category: 'beverages', legality: 'illegal', comment: "Only legal if fresh. Frozen, or canned grapefruit juice is not allowed. Juice should be diluted with water before drinking."},
    ], 'name')
  }

  getTypeList() {
    return sort([
      {id:'legal', label: 'Legal'},
      {id:'illegal', label: 'Illegal'}
    ], 'label')
  }

  getCategoryList() {
    return sort([
      {id:'vegetables', label: 'Vegetables'},
      {id:'fruits', label: 'Fruits'},
      {id:'meats', label: 'Meats'},
      {id:'beverages', label: 'Beverages'},
      //...
    ], 'label')
  }

}
