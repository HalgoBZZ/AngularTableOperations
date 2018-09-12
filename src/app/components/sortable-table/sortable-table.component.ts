import { Component, OnInit, Renderer } from '@angular/core';
import { CategoryPipe } from '../../pipes/category.pipe';

@Component({
  selector: 'app-sortable-table',
  templateUrl: './sortable-table.component.html',
  styleUrls: ['./sortable-table.component.css']
  
})
export class SortableTableComponent implements OnInit {

  records: Array<any>;
  allRecords: Array<any>;
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
  width1:number;
  width2:number;
  width3:number;
  startX = 0;
  pressed = false;
  start: any;
  startWidth: any;
  linePerPage: number = 5;
  nbRows: number;
  nbPages: number =1;
  current: number = 1;
  
  constructor(private renderer:Renderer) { }

  ngOnInit() {
    this.allRecords= [
      { CategoryID: 1,  CategoryName: "Beverages", Description: "Coffees, teas", selected:false},
      { CategoryID: 2,  CategoryName: "Condiments", Description: "Sweet and savory sauces", selected:false },
      { CategoryID: 3,  CategoryName: "Confections", Description: "Desserts and candies", selected:false },
      { CategoryID: 4,  CategoryName: "Cheeses",  Description: "Smetana, Quark and Cheddar Cheese", selected:false },
      { CategoryID: 5,  CategoryName: "Grains/Cereals", Description: "Breads, crackers, pasta, and cereal", selected:false },
      { CategoryID: 6,  CategoryName: "Beverages", Description: "Beers, and ales", selected:false },
      { CategoryID: 7,  CategoryName: "Condiments", Description: "Selishes, spreads, and seasonings", selected:false },
      { CategoryID: 8,  CategoryName: "Confections", Description: "Sweet breads", selected:false },
      { CategoryID: 9,  CategoryName: "Cheeses",  Description: "Cheese Burger", selected:false },
      { CategoryID: 10, CategoryName: "Grains/Cereals", Description: "Breads, crackers, pasta, and cereal", selected:false },
	    { CategoryID: 11, CategoryName: "Gdsdeverages", Description: "Coffees, teas", selected:false },
      { CategoryID: 12, CategoryName: "Zondiments", Description: "Sweet and savory sauces", selected:false },
      { CategoryID: 13, CategoryName: "Yonfections", Description: "Desserts and candies", selected:false },
      { CategoryID: 14, CategoryName: "Pheeses",  Description: "Smetana, Quark and Cheddar Cheese", selected:false },
      { CategoryID: 15, CategoryName: "Fins/Rreals", Description: "Breads, crackers, pasta, and cereal", selected:false },
      { CategoryID: 16, CategoryName: "Tererages", Description: "Beers, and ales", selected:false },
      { CategoryID: 17, CategoryName: "Vondiments", Description: "Selishes, spreads, and seasonings", selected:false },
      { CategoryID: 18, CategoryName: "Nbnonfections", Description: "Sweet breads", selected:false },
      { CategoryID: 19, CategoryName: "Threeses",  Description: "Cheese Burger", selected:false },
      { CategoryID: 20, CategoryName: "Grainers/Ceresls", Description: "Breads, crackers, pasta, and cereal", selected:false },
      { CategoryID: 1,  CategoryName: "Beverages", Description: "Coffees, teas", selected:false},
      { CategoryID: 2,  CategoryName: "Condiments", Description: "Sweet and savory sauces", selected:false },
      { CategoryID: 3,  CategoryName: "Confections", Description: "Desserts and candies", selected:false },
      { CategoryID: 4,  CategoryName: "Cheeses",  Description: "Smetana, Quark and Cheddar Cheese", selected:false },
      { CategoryID: 5,  CategoryName: "Grains/Cereals", Description: "Breads, crackers, pasta, and cereal", selected:false },
      { CategoryID: 6,  CategoryName: "Beverages", Description: "Beers, and ales", selected:false },
      { CategoryID: 7,  CategoryName: "Condiments", Description: "Selishes, spreads, and seasonings", selected:false },
      { CategoryID: 8,  CategoryName: "Confections", Description: "Sweet breads", selected:false },
      { CategoryID: 9,  CategoryName: "Cheeses",  Description: "Cheese Burger", selected:false },
      { CategoryID: 10, CategoryName: "Grains/Cereals", Description: "Breads, crackers, pasta, and cereal", selected:false },
	    { CategoryID: 11, CategoryName: "Gdsdeverages", Description: "Coffees, teas", selected:false },
      { CategoryID: 12, CategoryName: "Zondiments", Description: "Sweet and savory sauces", selected:false },
      { CategoryID: 13, CategoryName: "Yonfections", Description: "Desserts and candies", selected:false },
      { CategoryID: 14, CategoryName: "Pheeses",  Description: "Smetana, Quark and Cheddar Cheese", selected:false },
      { CategoryID: 15, CategoryName: "Fins/Rreals", Description: "Breads, crackers, pasta, and cereal", selected:false },
      { CategoryID: 16, CategoryName: "Tererages", Description: "Beers, and ales", selected:false },
      { CategoryID: 17, CategoryName: "Vondiments", Description: "Selishes, spreads, and seasonings", selected:false },
      { CategoryID: 18, CategoryName: "Nbnonfections", Description: "Sweet breads", selected:false },
      { CategoryID: 19, CategoryName: "Threeses",  Description: "Cheese Burger", selected:false },
      { CategoryID: 20, CategoryName: "Grainers/Ceresls", Description: "Breads, crackers, pasta, and cereal", selected:false }
     ];
     this.nbRows = this.allRecords.length;
     this.getPageNumber();
     this.renitTable();
  }

sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
}

checkAll(ev) {
  this.records.forEach(x => x.selected = ev.target.checked);
}

isAllChecked() {
  return this.records.every(_ => _.selected);
}

onMouseDown(event) {
  this.start = event.target;
  this.pressed = true;
  this.startX = event.clientX;
  this.startWidth = $(this.start).parent().width();
  this.initResizableColumns();
}

private initResizableColumns() {
  this.renderer.listenGlobal('body', 'mousemove', (event) => {
     if ( this.pressed ) {
        const width = this.startWidth + (event.clientX - this.startX);
        $(this.start).parent().css({'min-width': width, 'max-width': width});
        this.updateWidth();
      }
  });
  this.renderer.listenGlobal('window', 'mouseup', (event) => {
  if (this.pressed) {
      this.pressed = false;
    }
  });
}

private updateWidth() {
  this.width1 = document.getElementById('th1').clientWidth;
  this.width2 = document.getElementById('th2').clientWidth;
  this.width3 = document.getElementById('th3').clientWidth;
}

getPageNumber() {
 let quotient = Math.floor(this.nbRows/this.linePerPage);
 let remainder = this.nbRows % this.linePerPage;
 if(remainder == 0) {
   this.nbPages = quotient;
 } else {
   this.nbPages = quotient+1;
 }
 console.log(this.nbPages);
}

goNextPage(){
  if(this.current<this.nbPages){
    this.current=this.current+1;
  }
  this.renitTable();
}

goPreviousPage(){
  if(this.current>1){
    this.current = this.current-1;
  }
  this.renitTable();
}

goSpecificPage(i:number){
  this.current = i;
  this.renitTable();
}

renitTable(){
  this.records = [];
  this.getPageNumber();
  if(this.linePerPage*(this.current)-1<this.nbRows){
    for(let i=this.linePerPage*(this.current-1);i<this.linePerPage*(this.current);i++){
      this.records.push(this.allRecords[i]);
    }
  } else{
      for(let i=this.linePerPage*(this.current-1);i<this.nbRows;i++){
        this.records.push(this.allRecords[i]);
    }
  }
}
}
