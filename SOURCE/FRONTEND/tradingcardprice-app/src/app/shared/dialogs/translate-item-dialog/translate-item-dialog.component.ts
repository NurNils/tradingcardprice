import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateItem } from '../../../interfaces/translate-item.interface';

@Component({
  selector: 'app-translate-item-dialog',
  templateUrl: './translate-item-dialog.component.html',
  styleUrls: ['./translate-item-dialog.component.scss'],
})
export class TranslateItemDialogComponent implements OnInit {
  /** Translate item form group */
  translateItemFormGroup: FormGroup;

  /** Languages */
  languages = ['de', 'en' /* 'cn', 'es', 'fr', 'it', 'jp', 'nl', 'pl', 'pt', 'ru'*/];

  /** Markdown preview */
  markdownPreview = false;

  /** Constructor */
  constructor(
    public dialogRef: MatDialogRef<TranslateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { translateItem: TranslateItem; markdown: boolean },
    private formBuilder: FormBuilder
  ) {}

  /** Initialize translate item form */
  ngOnInit() {
    this.translateItemFormGroup = this.formBuilder.group({
      cn: [this.data.translateItem.cn],
      de: [this.data.translateItem.de, Validators.required],
      en: [this.data.translateItem.en, Validators.required],
      es: [this.data.translateItem.es],
      fr: [this.data.translateItem.fr],
      it: [this.data.translateItem.it],
      jp: [this.data.translateItem.jp],
      nl: [this.data.translateItem.nl],
      pl: [this.data.translateItem.pl],
      pt: [this.data.translateItem.pt],
      ru: [this.data.translateItem.ru],
    });
  }

  /** Close dialog with data */
  saveChanges() {
    const translateItem: TranslateItem = {
      cn: this.translateItemFormGroup.get('cn')
        ? this.translateItemFormGroup.get('cn').value
        : null,
      de: this.translateItemFormGroup.get('de')
        ? this.translateItemFormGroup.get('de').value
        : null,
      en: this.translateItemFormGroup.get('en')
        ? this.translateItemFormGroup.get('en').value
        : null,
      es: this.translateItemFormGroup.get('es')
        ? this.translateItemFormGroup.get('es').value
        : null,
      fr: this.translateItemFormGroup.get('fr')
        ? this.translateItemFormGroup.get('fr').value
        : null,
      it: this.translateItemFormGroup.get('it')
        ? this.translateItemFormGroup.get('it').value
        : null,
      jp: this.translateItemFormGroup.get('jp')
        ? this.translateItemFormGroup.get('jp').value
        : null,
      nl: this.translateItemFormGroup.get('nl')
        ? this.translateItemFormGroup.get('nl').value
        : null,
      pl: this.translateItemFormGroup.get('pl')
        ? this.translateItemFormGroup.get('pl').value
        : null,
      pt: this.translateItemFormGroup.get('pt')
        ? this.translateItemFormGroup.get('pt').value
        : null,
      ru: this.translateItemFormGroup.get('ru')
        ? this.translateItemFormGroup.get('ru').value
        : null,
    };
    this.dialogRef.close(translateItem);
  }
}
