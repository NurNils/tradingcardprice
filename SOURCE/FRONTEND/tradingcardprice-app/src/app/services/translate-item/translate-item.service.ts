import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateItemDialogComponent } from '../../shared/dialogs/translate-item-dialog/translate-item-dialog.component';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TranslateItemService {
  /** Constructor */
  constructor(public dialog: MatDialog) {}

  /** Open translate item dialog */
  async openTranslateItemDialog(formGroup: FormGroup, formControlName: string, markdown?: boolean) {
    const dialog = this.dialog.open(TranslateItemDialogComponent, {
      width: '870px',
      data: { translateItem: formGroup.get(formControlName).value, markdown },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        formGroup.get(formControlName).patchValue(result);
      }
    });
  }
}
