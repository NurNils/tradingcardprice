import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment.default';

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.scss'],
})
export class ProductShowcaseComponent {
  /** App name */
  appName = env.appName;

  /** Constructor */
  constructor() {}
}
