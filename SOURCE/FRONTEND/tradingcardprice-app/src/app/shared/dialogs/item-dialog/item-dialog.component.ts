import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IResponseStatus, Item } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import { IdService } from 'src/app/services/id/id.service';
import { TranslateItemService } from 'src/app/services/translate-item/translate-item.service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent implements OnInit {
  /** Item form group */
  itemFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private apiService: ApiService,
    public translateItemService: TranslateItemService,
    public idService: IdService
  ) {}

  /** Initialize form group */
  async ngOnInit() {
    if (this.data) {
      this.itemFormGroup = this.formBuilder.group({
        key: [
          this.data.key,
          [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
        ],
        priority: [this.data.priority, Validators.required],
        productId: [this.data.productId, Validators.required],
        index: [this.data.index, Validators.required],
        activated: [this.data.activated, Validators.required],
        displayname: [this.data.displayname, Validators.required],
        description: [this.data.description, Validators.required],
        thumbnail: [this.data.thumbnail, Validators.required],
        images: [this.data.images, Validators.required],
        clicks: [this.data.clicks, Validators.required],
      });
    } else {
      this.itemFormGroup = this.formBuilder.group({
        key: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
        priority: [0, Validators.required],
        productId: [null, Validators.required],
        index: ['1/3', Validators.required],
        activated: [true, Validators.required],
        displayname: [{ de: 'Glurak Shadowless', en: 'Charizard Shadowless' }, Validators.required],
        description: [{ de: 'Beschreibung...', en: 'Beschreibung...' }, Validators.required],
        thumbnail: [null, Validators.required],
        images: [[], Validators.required],
        clicks: [0, Validators.required],
      });
    }
  }

  /** Save or update data */
  async save() {
    const item: Item = {
      key: this.itemFormGroup.get('key').value,
      priority: this.itemFormGroup.get('priority').value,
      productId: this.itemFormGroup.get('productId').value,
      index: this.itemFormGroup.get('index').value,
      activated: this.itemFormGroup.get('activated').value,
      displayname: this.itemFormGroup.get('displayname').value,
      description: this.itemFormGroup.get('description').value,
      thumbnail: this.itemFormGroup.get('thumbnail').value,
      images: this.itemFormGroup.get('images').value,
      clicks: this.itemFormGroup.get('clicks').value,
    };
    if (this.data) {
      const res = await this.apiService.put(`item/${this.data._id}`, item);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    } else {
      const res = await this.apiService.post(`item`, item);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    }
  }
}
