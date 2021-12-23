import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IdGalleryDialogComponent } from 'src/app/shared/dialogs/id-gallery-dialog/id-gallery-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  /** Constructor */
  constructor(public dialog: MatDialog) {}

  /** Open ids gallery */
  async openIdsGalleryDialog(
    formGroup: FormGroup,
    formControlName: string,
    key: string,
    multiple: boolean
  ) {
    const dialog = this.dialog.open(IdGalleryDialogComponent, {
      width: '870px',
      data: {
        ids: formGroup.get(formControlName).value,
        multiple,
        key,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        formGroup.get(formControlName).patchValue(result);
      }
    });
  }
}
