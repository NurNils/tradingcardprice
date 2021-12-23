import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Category, Game, IResponseStatus, Product, Supercategory } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  /** Loaded game */
  game: Game;

  /** Search tag */
  search: string;

  /** Loaded products */
  products: Product[];

  /** Loaded search data */
  searchData: any[];

  /** Loaded supercategories */
  supercategories: Supercategory[];

  /** Loaded categories */
  categories: Category[];

  /** Constructor */
  constructor(
    private apiService: ApiService,
    public translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((val) => {
      activatedRoute.queryParams.subscribe((params) => {
        const game = activatedRoute.snapshot.paramMap.get('game');
        this.loadData(game, params);
      });
    });
  }

  /** Load data */
  async loadData(game: string, params: any) {
    if (params?.search) {
      this.search = params.search;
      const res = await this.apiService.get(`search/${game}`, params);
      if (res.status === IResponseStatus.success) {
        this.game = null;
        this.products = res.data.products as Product[];
        this.supercategories = null;
        this.categories = res.data.categories as Category[];
      }
    } else {
      const res = await this.apiService.get(`supercategories/${game}`, params);
      if (res.status === IResponseStatus.success) {
        this.game = res.data.game as Game;
        this.products = null;
        this.supercategories = res.data.supercategories as Supercategory[];
        this.categories = res.data.categories as Category[];
        this.search = null;
      }
    }
  }

  /** Get category by _id */
  getCategory(id: string) {
    return this.categories.find((category) => category._id === id);
  }

  /** Get products by categoryId */
  getProductsByCategoryId(categoryId: string) {
    return this.products.filter((product) => product.categoryId === categoryId);
  }
}
