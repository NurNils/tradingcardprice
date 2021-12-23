import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Category, IResponseStatus, Product } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  /** Displayed columns */
  displayedColumns: string[] = ['index', 'name', 'rarity'];

  /** Datasource for Table */
  dataSource: MatTableDataSource<Product>;

  /** MatPaginator ViewChild */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** MatSort ViewChild */
  @ViewChild(MatSort) sort: MatSort;

  /** Filter form group */
  filterFormGroup: FormGroup;

  /** Loaded category */
  category: Category;

  /** Loaded products */
  products: Product[];

  /** Constructor */
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    public translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((val) => {
      const category = activatedRoute.snapshot.paramMap.get('category');
      this.loadData(category);
    });
  }

  /** Initialize */
  ngOnInit() {
    this.filterFormGroup = this.formBuilder.group({
      filter: [null, [Validators.maxLength(1000)]],
    });
  }

  /** Load data */
  async loadData(category: string) {
    const res = await this.apiService.get(`category-products/${category}`);
    if (res.status === IResponseStatus.success) {
      this.category = res.data.category as Category;
      const dataSource = [];
      for (let product of res.data.products) {
        dataSource.push({
          key: product.key,
          index: product.index,
          name: product.displayname[this.translateService.currentLang],
          rarity: product.rarity,
        });
      }
      this.dataSource = new MatTableDataSource(dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  /** Apply filter to datasource */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Clear filter */
  clearFilter() {
    this.filterFormGroup.patchValue({ filter: null });
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
