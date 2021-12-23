import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Category, IResponseStatus } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import { IdService } from 'src/app/services/id/id.service';
import { TranslateItemService } from 'src/app/services/translate-item/translate-item.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  /** Category form group */
  categoryFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private apiService: ApiService,
    public translateItemService: TranslateItemService,
    public idService: IdService
  ) {}

  /** Initialize form group */
  async ngOnInit() {
    if (this.data) {
      this.categoryFormGroup = this.formBuilder.group({
        key: [
          this.data.key,
          [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
        ],
        priority: [this.data.priority, Validators.required],
        gameId: [this.data.gameId, Validators.required],
        releases: [this.data.releases, Validators.required],
        activated: [this.data.activated, Validators.required],
        new: [this.data.new, Validators.required],
        displayname: [this.data.displayname, Validators.required],
        description: [this.data.description, Validators.required],
        thumbnail: [this.data.thumbnail, Validators.required],
        symbol: [this.data.symbol, Validators.required],
        images: [this.data.images, Validators.required],
        clicks: [this.data.clicks, Validators.required],
      });
    } else {
      this.categoryFormGroup = this.formBuilder.group({
        key: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
        priority: [0, Validators.required],
        gameId: [null, Validators.required],
        releases: [{ germany: new Date(), usa: new Date() }, Validators.required],
        activated: [true, Validators.required],
        new: [false, Validators.required],
        displayname: [{ de: 'Basis Set', en: 'Base Set' }, Validators.required],
        description: [{ de: 'Beschreibung...', en: 'Beschreibung...' }, Validators.required],
        thumbnail: ['assets/images/thumbnail.jpg', Validators.required],
        symbol: ['assets/images/symbol.jpg', Validators.required],
        images: [[], Validators.required],
        clicks: [0, Validators.required],
      });
    }
  }

  /** Save or update data */
  async save() {
    const category: Category = {
      key: this.categoryFormGroup.get('key').value,
      priority: this.categoryFormGroup.get('priority').value,
      gameId: this.categoryFormGroup.get('gameId').value,
      releases: this.categoryFormGroup.get('releases').value,
      activated: this.categoryFormGroup.get('activated').value,
      new: this.categoryFormGroup.get('new').value,
      displayname: this.categoryFormGroup.get('displayname').value,
      description: this.categoryFormGroup.get('description').value,
      thumbnail: this.categoryFormGroup.get('thumbnail').value,
      symbol: this.categoryFormGroup.get('symbol').value,
      images: this.categoryFormGroup.get('images').value,
      clicks: this.categoryFormGroup.get('clicks').value,
    };
    if (this.data) {
      const res = await this.apiService.put(`category/${this.data._id}`, category);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    } else {
      const res = await this.apiService.post(`category`, category);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    }
  }
}
