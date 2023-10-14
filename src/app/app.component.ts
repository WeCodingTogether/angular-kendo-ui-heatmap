import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { categories } from './data.categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]  // add ProductService here as a provider
})
export class AppComponent {
  title = 'kendo-heatmap-demo';

  // used for the Grid
  public gridItems!: Observable<GridDataResult>;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;

  // used for the DropDownList
  public dropDwonItems = categories;
  public defaultItem = { text: "Filter by Category", value: null };  // grid的default显示这个text， 表格的内容显示所有products，没有fileter

  constructor(private service: ProductService) {
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGridItems();
  }

  public handleSortChange(descrptor: SortDescriptor[]): void {
    this.sortDescriptor = descrptor;
    this.loadGridItems();
  }

  private loadGridItems(): void {
    this.gridItems = this.service.getProducts(this.skip, this.pageSize, this.sortDescriptor, this.filterTerm);
  }

  public handleFilterChange(item: { text: string; value: number | null }): void {
    this.filterTerm = item.value;  // update filterTerm here then after click one category the whole Grid data will change 改变filterTerm来筛选显示原grid的数据
    this.skip = 0;
    this.loadGridItems();
  }

}
