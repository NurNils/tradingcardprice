import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Category, Game, IResponseStatus, Item, Product, Supercategory } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { CategoryDialogComponent } from 'src/app/shared/dialogs/category-dialog/category-dialog.component';
import { GameDialogComponent } from 'src/app/shared/dialogs/game-dialog/game-dialog.component';
import { ItemDialogComponent } from 'src/app/shared/dialogs/item-dialog/item-dialog.component';
import { ProductDialogComponent } from 'src/app/shared/dialogs/product-dialog/product-dialog.component';
import { SupercategoryDialogComponent } from 'src/app/shared/dialogs/supercategory-dialog/supercategory-dialog.component';

@Component({
  selector: 'app-acp',
  templateUrl: './acp.component.html',
  styleUrls: ['./acp.component.scss'],
})
export class AcpComponent {
  /** Data */
  data: any = {
    categories: [],
    games: [],
    items: [],
    products: [],
    supercategories: [],
  };

  /** Constructor */
  constructor(
    private apiService: ApiService,
    public translate: TranslateService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) {
    this.loadData();
  }

  /** Load data from backend */
  async loadData() {
    const res = await this.apiService.get('acp');
    if (res.status === IResponseStatus.success) {
      this.data = res.data;
    }
  }

  /** Edit category */
  async editCategory(category: Category) {
    const res = await this.apiService.get(`category/${category._id}`);
    if (res.status === IResponseStatus.success) {
      const dialog = this.dialog.open(CategoryDialogComponent, {
        width: '1000px',
        data: res.data,
      });

      dialog.afterClosed().subscribe(async (result) => {
        if (result) {
          this.data.categories[this.data.category.indexOf(category)] = result;
        }
      });
    } else {
      this.snackBarService.openErrorSnackBar('not-found');
    }
  }

  /** Add category */
  async addCategory() {
    const dialog = this.dialog.open(CategoryDialogComponent, {
      width: '1000px',
      data: null,
    });

    dialog.afterClosed().subscribe(async (result) => {
      if (result) {
        this.data.categories.push(result);
      }
    });
  }

  /** Delete category */
  async deleteCategory(category: Category) {
    if (confirm(this.translate.instant('delete-confirm'))) {
      const res = await this.apiService.delete(`category/${category._id}`);
      if (res.status === IResponseStatus.success) {
        this.snackBarService.openSuccessSnackBar('deleted');
        this.data.categories.splice(this.data.categories.indexOf(category), 1);
      }
    }
  }

  /** Duplicate category */
  async duplicateCategory(category: Category) {
    const res = await this.apiService.get(`category/${category._id}/duplicate`);
    if (res.status === IResponseStatus.success) {
      this.snackBarService.openSuccessSnackBar('duplicated');
      this.data.categories.push(res.data as Category);
    }
  }

  /** Edit game */
  async editGame(game: Game) {
    const res = await this.apiService.get(`game/${game._id}`);
    if (res.status === IResponseStatus.success) {
      const dialog = this.dialog.open(GameDialogComponent, {
        width: '1000px',
        data: res.data,
      });

      dialog.afterClosed().subscribe(async (result) => {
        if (result) {
          this.data.games[this.data.games.indexOf(game)] = result;
        }
      });
    } else {
      this.snackBarService.openErrorSnackBar('not-found');
    }
  }

  /** Add game */
  async addGame() {
    const dialog = this.dialog.open(GameDialogComponent, {
      width: '1000px',
      data: null,
    });

    dialog.afterClosed().subscribe(async (result) => {
      if (result) {
        this.data.games.push(result);
      }
    });
  }

  /** Delete game */
  async deleteGame(game: Game) {
    if (confirm(this.translate.instant('delete-confirm'))) {
      const res = await this.apiService.delete(`game/${game._id}`);
      if (res.status === IResponseStatus.success) {
        this.snackBarService.openSuccessSnackBar('deleted');
        this.data.games.splice(this.data.games.indexOf(game), 1);
      }
    }
  }

  /** Duplicate game */
  async duplicateGame(game: Game) {
    const res = await this.apiService.get(`game/${game._id}/duplicate`);
    if (res.status === IResponseStatus.success) {
      this.snackBarService.openSuccessSnackBar('duplicated');
      this.data.games.push(res.data as Game);
    }
  }

  /** Edit item */
  async editItem(item: Item) {
    const res = await this.apiService.get(`item/${item._id}`);
    if (res.status === IResponseStatus.success) {
      const dialog = this.dialog.open(ItemDialogComponent, {
        width: '1000px',
        data: res.data,
      });

      dialog.afterClosed().subscribe(async (result) => {
        if (result) {
          this.data.items[this.data.items.indexOf(item)] = result;
        }
      });
    } else {
      this.snackBarService.openErrorSnackBar('not-found');
    }
  }

  /** Add item */
  async addItem() {
    const dialog = this.dialog.open(ItemDialogComponent, {
      width: '1000px',
      data: null,
    });

    dialog.afterClosed().subscribe(async (result) => {
      if (result) {
        this.data.items.push(result);
      }
    });
  }

  /** Delete item */
  async deleteItem(item: Item) {
    if (confirm(this.translate.instant('delete-confirm'))) {
      const res = await this.apiService.delete(`item/${item._id}`);
      if (res.status === IResponseStatus.success) {
        this.snackBarService.openSuccessSnackBar('deleted');
        this.data.items.splice(this.data.items.indexOf(item), 1);
      }
    }
  }

  /** Duplicate item */
  async duplicateItem(item: Item) {
    const res = await this.apiService.get(`item/${item._id}/duplicate`);
    if (res.status === IResponseStatus.success) {
      this.snackBarService.openSuccessSnackBar('duplicated');
      this.data.items.push(res.data as Item);
    }
  }

  /** Edit product */
  async editProduct(product: Product) {
    const res = await this.apiService.get(`product/${product._id}`);
    if (res.status === IResponseStatus.success) {
      const dialog = this.dialog.open(ProductDialogComponent, {
        width: '1000px',
        data: res.data,
      });

      dialog.afterClosed().subscribe(async (result) => {
        if (result) {
          this.data.products[this.data.products.indexOf(product)] = result;
        }
      });
    } else {
      this.snackBarService.openErrorSnackBar('not-found');
    }
  }

  /** Add product */
  async addProduct() {
    const dialog = this.dialog.open(ProductDialogComponent, {
      width: '1000px',
      data: null,
    });

    dialog.afterClosed().subscribe(async (result) => {
      if (result) {
        this.data.products.push(result);
      }
    });
  }

  /** Delete product */
  async deleteProduct(product: Product) {
    if (confirm(this.translate.instant('delete-confirm'))) {
      const res = await this.apiService.delete(`product/${product._id}`);
      if (res.status === IResponseStatus.success) {
        this.snackBarService.openSuccessSnackBar('deleted');
        this.data.products.splice(this.data.products.indexOf(product), 1);
      }
    }
  }

  /** Duplicate product */
  async duplicateProduct(product: Product) {
    const res = await this.apiService.get(`product/${product._id}/duplicate`);
    if (res.status === IResponseStatus.success) {
      this.snackBarService.openSuccessSnackBar('duplicated');
      this.data.products.push(res.data as Product);
    }
  }

  /** Edit supercategory */
  async editSupercategory(supercategory: Supercategory) {
    const res = await this.apiService.get(`supercategory/${supercategory._id}`);
    if (res.status === IResponseStatus.success) {
      const dialog = this.dialog.open(SupercategoryDialogComponent, {
        width: '1000px',
        data: res.data,
      });

      dialog.afterClosed().subscribe(async (result) => {
        if (result) {
          this.data.supercategories[this.data.supercategories.indexOf(supercategory)] = result;
        }
      });
    } else {
      this.snackBarService.openErrorSnackBar('not-found');
    }
  }

  /** Add supercategory */
  async addSupercategory() {
    const dialog = this.dialog.open(SupercategoryDialogComponent, {
      width: '1000px',
      data: null,
    });

    dialog.afterClosed().subscribe(async (result) => {
      if (result) {
        this.data.supercategories.push(result);
      }
    });
  }

  /** Delete supercategory */
  async deleteSupercategory(supercategory: Supercategory) {
    if (confirm(this.translate.instant('delete-confirm'))) {
      const res = await this.apiService.delete(`supercategory/${supercategory._id}`);
      if (res.status === IResponseStatus.success) {
        this.snackBarService.openSuccessSnackBar('deleted');
        this.data.supercategories.splice(this.data.supercategories.indexOf(supercategory), 1);
      }
    }
  }

  /** Duplicate supercategory */
  async duplicateSupercategory(supercategory: Supercategory) {
    const res = await this.apiService.get(`supercategory/${supercategory._id}/duplicate`);
    if (res.status === IResponseStatus.success) {
      this.snackBarService.openSuccessSnackBar('duplicated');
      this.data.supercategories.push(res.data as Supercategory);
    }
  }
}
