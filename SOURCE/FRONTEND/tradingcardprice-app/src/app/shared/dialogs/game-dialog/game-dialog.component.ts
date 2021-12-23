import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Game, IResponseStatus } from 'src/app/interfaces';
import { ApiService } from 'src/app/services/api/api.service';
import { TranslateItemService } from 'src/app/services/translate-item/translate-item.service';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss'],
})
export class GameDialogComponent implements OnInit {
  /** Game form group */
  gameFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game,
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private apiService: ApiService,
    public translateItemService: TranslateItemService
  ) {}

  /** Initialize form group */
  async ngOnInit() {
    if (this.data) {
      this.gameFormGroup = this.formBuilder.group({
        key: [
          this.data.key,
          [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
        ],
        priority: [this.data.priority, Validators.required],
        activated: [this.data.activated, Validators.required],
        displayname: [this.data.displayname, Validators.required],
        description: [this.data.description, Validators.required],
        thumbnail: [this.data.thumbnail, Validators.required],
        clicks: [this.data.clicks, Validators.required],
      });
    } else {
      this.gameFormGroup = this.formBuilder.group({
        key: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
        priority: [0, Validators.required],
        activated: [true, Validators.required],
        displayname: [{ de: 'Pokemon', en: 'Pokemon' }, Validators.required],
        description: [{ de: 'Beschreibung...', en: 'Beschreibung...' }, Validators.required],
        thumbnail: [null, Validators.required],
        clicks: [0, Validators.required],
      });
    }
  }

  /** Save or update data */
  async save() {
    const game: Game = {
      key: this.gameFormGroup.get('key').value,
      priority: this.gameFormGroup.get('priority').value,
      activated: this.gameFormGroup.get('activated').value,
      displayname: this.gameFormGroup.get('displayname').value,
      description: this.gameFormGroup.get('description').value,
      thumbnail: this.gameFormGroup.get('thumbnail').value,
      clicks: this.gameFormGroup.get('clicks').value,
    };
    if (this.data) {
      const res = await this.apiService.put(`game/${this.data._id}`, game);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    } else {
      const res = await this.apiService.post(`game`, game);
      if (res.status === IResponseStatus.success) {
        this.dialogRef.close(res.data);
      }
    }
  }
}
