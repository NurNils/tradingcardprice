import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IResponseStatus, Item, Product, Purchase } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import { Chart } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  /** Displayed columns */
  displayedColumns: string[] = ['saleDate', 'title', 'price', 'auctionId', 'sellerId', 'saleType'];

  /** Datasource for Table */
  dataSource: MatTableDataSource<Product>;

  /** MatPaginator ViewChild */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** MatSort ViewChild */
  @ViewChild(MatSort) sort: MatSort;

  /** Filter form group */
  filterFormGroup: FormGroup;

  /** Loaded product */
  product: Product;

  /** Loaded items */
  items: Item[];

  /** Loaded purchases */
  purchases: Purchase[];

  /** Price chart */
  priceChart: any;

  /** Constructor */
  constructor(
    private apiService: ApiService,
    public translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    activatedRoute.params.subscribe((val) => {
      const product = activatedRoute.snapshot.paramMap.get('product');
      this.loadData(product);
    });
  }

  /** Initialize */
  ngOnInit() {
    this.filterFormGroup = this.formBuilder.group({
      filter: [null, [Validators.maxLength(1000)]],
    });
  }

  /** Get date formatted */
  getDate(d: string) {
    const date = new Date(d);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  /** Initialize chart and data source */
  initChartAndDatasource() {
    const currentDate = new Date();
    const oneDayBefore = new Date();
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    const twoDaysBefore = new Date();
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);
    const threeDaysBefore = new Date();
    threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
    const fourDaysBefore = new Date();
    fourDaysBefore.setDate(fourDaysBefore.getDate() - 4);
    const fiveDaysBefore = new Date();
    fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5);
    const sixDaysBefore = new Date();
    sixDaysBefore.setDate(sixDaysBefore.getDate() - 6);

    /* Labels */
    const labels = [];
    const data = [];
    /** Data source */
    const dataSource = [];
    for (let purchase of this.purchases) {
      const saleDate = new Date(purchase.saleDate).toDateString();
      labels.push(saleDate);
      data.push(purchase.price);
      dataSource.push({
        saleDate,
        price: purchase.price,
        currency: purchase.currency,
        title: purchase.title,
        auctionId: purchase.auctionId,
        sellerId: purchase.sellerId,
        saleType: purchase.saleType,
      });
    }
    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    /* Price chart */
    this.priceChart = new Chart('priceChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: this.translateService.instant('sale-price'),
            data,
            fill: true,
            lineTension: 0,
            borderColor: '#4caf50',
            borderWidth: 3,
          },
        ],
      },
    });
  }

  /** Load data */
  async loadData(product: string) {
    const res = await this.apiService.get(`product-items/${product}`);
    if (res.status === IResponseStatus.success) {
      this.product = res.data.product as Product;
      this.items = res.data.items as Item[];
      this.purchases = res.data.purchases as Purchase[];
      this.initChartAndDatasource();
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
