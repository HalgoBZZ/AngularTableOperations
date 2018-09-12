import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { SortableTableComponent } from './components/sortable-table/sortable-table.component';
import { CategoryPipe } from './pipes/category.pipe';
import { OrderbyPipe } from './pipes/orderby.pipe';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    SortableTableComponent,
    CategoryPipe,
    OrderbyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
