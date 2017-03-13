import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FoodListComponent } from './food-list/food-list.component'
import { DataService } from "./data.service";

import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/startWith';
import { FoodFiltersComponent } from './food-filters/food-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    FoodFiltersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
