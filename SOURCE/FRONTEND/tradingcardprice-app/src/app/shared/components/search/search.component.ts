import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  /** Search form group */
  searchFormGroup: FormGroup;

  /** Constructor */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private translate: TranslateService
  ) {}

  /** Initialize form group */
  ngOnInit() {
    this.searchFormGroup = this.formBuilder.group({
      type: ['pokemon', [Validators.required]],
      search: [null, [Validators.maxLength(300), Validators.required]],
    });
  }

  /** Search */
  search() {
    if (this.searchFormGroup.valid) {
      this.router.navigateByUrl(
        `/games/${this.searchFormGroup.get('type').value}?search=${
          this.searchFormGroup.get('search').value
        }&lang=${this.translate.currentLang}`
      );
    }
  }
}
