import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IResponseStatus, Product } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import { IdService } from 'src/app/services/id/id.service';
import { TranslateItemService } from 'src/app/services/translate-item/translate-item.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent implements OnInit {
  /** Product form group */
  productFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private apiService: ApiService,
    public translateItemService: TranslateItemService,
    public idService: IdService
  ) {}

  /** Initialize form group */
  async ngOnInit() {
    if (this.data) {
      this.productFormGroup = this.formBuilder.group({
        key: [
          this.data.key,
          [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
        ],
        priority: [this.data.priority, Validators.required],
        gameId: [this.data.gameId, Validators.required],
        categoryId: [this.data.categoryId, Validators.required],
        index: [this.data.index, Validators.required],
        activated: [this.data.activated, Validators.required],
        displayname: [this.data.displayname, Validators.required],
        description: [this.data.description, Validators.required],
        thumbnail: [this.data.thumbnail, Validators.required],
        rarity: [this.data.rarity],
        images: [this.data.images, Validators.required],
        clicks: [this.data.clicks, Validators.required],
        ebayKeywords: [this.data.ebayKeywords],
        ebayCategoryId: [this.data.ebayCategoryId],
      });
    } else {
      this.productFormGroup = this.formBuilder.group({
        key: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
        priority: [0, Validators.required],
        index: ['1/102', Validators.required],
        gameId: [null, Validators.required],
        categoryId: [null, Validators.required],
        activated: [true, Validators.required],
        displayname: [{ de: 'Pokemon', en: 'Pokemon' }, Validators.required],
        description: [{ de: 'Beschreibung...', en: 'Beschreibung...' }, Validators.required],
        thumbnail: [null, Validators.required],
        rarity: [null],
        images: [[], Validators.required],
        clicks: [0, Validators.required],
        ebayKeywords: [null],
        ebayCategoryId: [null],
      });
    }
  }

  /** Save or update data */
  async save() {
    const product: Product = {
      key: this.productFormGroup.get('key').value,
      priority: this.productFormGroup.get('priority').value,
      gameId: this.productFormGroup.get('gameId').value,
      categoryId: this.productFormGroup.get('categoryId').value,
      index: this.productFormGroup.get('index').value,
      activated: this.productFormGroup.get('activated').value,
      displayname: this.productFormGroup.get('displayname').value,
      description: this.productFormGroup.get('description').value,
      thumbnail: this.productFormGroup.get('thumbnail').value,
      rarity: this.productFormGroup.get('rarity').value,
      images: this.productFormGroup.get('images').value,
      clicks: this.productFormGroup.get('clicks').value,
      ebayKeywords: this.productFormGroup.get('ebayKeywords').value,
      ebayCategoryId: this.productFormGroup.get('ebayCategoryId').value,
    };
    if (this.data) {
      const res = await this.apiService.put(`product/${this.data._id}`, product);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    } else {
      const res = await this.apiService.post(`product`, product);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    }
  }
}
