import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IResponseStatus, Supercategory } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import { IdService } from 'src/app/services/id/id.service';
import { TranslateItemService } from 'src/app/services/translate-item/translate-item.service';

@Component({
  selector: 'app-supercategory-dialog',
  templateUrl: './supercategory-dialog.component.html',
  styleUrls: ['./supercategory-dialog.component.scss'],
})
export class SupercategoryDialogComponent implements OnInit {
  /** Supercategory form group */
  supercategoryFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SupercategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Supercategory,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private apiService: ApiService,
    public translateItemService: TranslateItemService,
    public idService: IdService
  ) {}

  /** Initialize form group */
  async ngOnInit() {
    if (this.data) {
      this.supercategoryFormGroup = this.formBuilder.group({
        key: [
          this.data.key,
          [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
        ],
        priority: [this.data.priority, Validators.required],
        gameId: [this.data.gameId, Validators.required],
        categories: [this.data.categories, Validators.required],
        activated: [this.data.activated, Validators.required],
        displayname: [this.data.displayname, Validators.required],
        description: [this.data.description, Validators.required],
        thumbnail: [this.data.thumbnail, Validators.required],
        clicks: [this.data.clicks, Validators.required],
      });
    } else {
      this.supercategoryFormGroup = this.formBuilder.group({
        key: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
        priority: [0, Validators.required],
        gameId: [null, Validators.required],
        categories: [[], Validators.required],
        activated: [true, Validators.required],
        displayname: [{ de: 'XY Zyklus', en: 'XY Zyklus' }, Validators.required],
        description: [{ de: 'Beschreibung...', en: 'Beschreibung...' }, Validators.required],
        thumbnail: [null, Validators.required],
        clicks: [0, Validators.required],
      });
    }
  }

  /** Save or update data */
  async save() {
    const supercategory: Supercategory = {
      key: this.supercategoryFormGroup.get('key').value,
      priority: this.supercategoryFormGroup.get('priority').value,
      gameId: this.supercategoryFormGroup.get('gameId').value,
      categories: this.supercategoryFormGroup.get('categories').value,
      activated: this.supercategoryFormGroup.get('activated').value,
      displayname: this.supercategoryFormGroup.get('displayname').value,
      description: this.supercategoryFormGroup.get('description').value,
      thumbnail: this.supercategoryFormGroup.get('thumbnail').value,
      clicks: this.supercategoryFormGroup.get('clicks').value,
    };
    if (this.data) {
      const res = await this.apiService.put(`supercategory/${this.data._id}`, supercategory);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    } else {
      const res = await this.apiService.post(`supercategory`, supercategory);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    }
  }
}
