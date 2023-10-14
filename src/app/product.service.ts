import { Injectable } from '@angular/core';
import { DataResult, SortDescriptor, orderBy, process } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';
import { products } from './data.products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public getProducts(
        skip: number,
        pageSize: number,
        sortDescriptor: SortDescriptor[],
        filterTerm: number | null
    ): Observable<DataResult> {
        let data;
        if (filterTerm) {
            data = process(orderBy(products, sortDescriptor), {
                filter: {
                    logic: 'and',  // 'and' means must meet all requirements listed below, 'or' means meet any one of them
                    filters: [
                        {
                            field: 'CategoryID',
                            operator: 'eq',
                            value: filterTerm
                        }
                    ]
                }
            }).data;
        } else {
            data = orderBy(products, sortDescriptor);
        }
        return of({
            data: data.slice(skip, skip + pageSize),
            total: data.length
        });
    }
}
