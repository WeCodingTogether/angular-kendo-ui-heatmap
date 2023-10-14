import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]  // add ProductService here as a provider
})
export class AppComponent {
  title = 'kendo-heatmap-demo';

  public gridItems: Observable<GridDataResult>;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;

  constructor(private service: ProductService) {
    this.gridItems = new Observable<GridDataResult>();
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

}
