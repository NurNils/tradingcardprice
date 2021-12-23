import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api/api.service';
import { IResponseStatus } from '../../../interfaces';

@Component({
  selector: 'app-id-gallery-dialog',
  templateUrl: './id-gallery-dialog.component.html',
  styleUrls: ['./id-gallery-dialog.component.scss'],
})
export class IdGalleryDialogComponent implements OnInit {
  /** Ids */
  ids: any[] = [];

  /** Selected ids */
  selectedIds: string[];

  /** Constructor */
  constructor(
    public dialogRef: MatDialogRef<IdGalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { ids: string[] | string; multiple: boolean; key: string },
    private apiService: ApiService
  ) {
    if (data.multiple) {
      this.selectedIds = [...data.ids] as string[];
    } else {
      this.selectedIds = [data.ids] as string[];
    }
  }

  /** Initalize form groups */
  async ngOnInit() {
    const res = await this.apiService.get(this.data.key);
    if (res.status === IResponseStatus.success) {
      this.ids = res.data;
    }
  }

  /** Check if id is selected */
  isSelected(id: string) {
    return this.selectedIds.includes(id);
  }

  /** Select id */
  select(src: string) {
    if (this.data.multiple) {
      this.selectedIds.push(src);
    } else {
      this.selectedIds[0] = src;
    }
  }

  /** Deselect id */
  deselect(src: string) {
    if (this.data.multiple) {
      this.selectedIds.splice(this.selectedIds.indexOf(src), 1);
    } else {
      this.selectedIds[0] = null;
    }
  }

  /** Get amount selected ids */
  getAmountSelected() {
    if (this.data.multiple) {
      return this.selectedIds.length;
    } else if (this.selectedIds[0]) {
      return 1;
    } else {
      return 0;
    }
  }

  /** Deselect all ids */
  deselectAll() {
    if (this.data.multiple) {
      this.selectedIds = [];
    } else {
      this.selectedIds[0] = null;
    }
  }

  /** Close dialog */
  closeDialog() {
    if (this.data.multiple) {
      this.dialogRef.close(this.selectedIds);
    } else {
      this.dialogRef.close(this.selectedIds[0]);
    }
  }

  /** Close dialog on no click */
  onNoClick() {
    this.dialogRef.close();
  }
}
