import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-example',
  templateUrl: './feature-example.component.html',
  styleUrls: ['./feature-example.component.scss'],
})
export class FeatureExampleComponent {
  /** Router link (not neccessary) */
  @Input() routerLink: string;

  /** Title */
  @Input() title: string;

  /** Description */
  @Input() description: string;

  /** Icon */
  @Input() icon: string;

  /** Image src */
  @Input() imageSrc: string;

  /** Image alt */
  @Input() imageAlt: string;

  /** Image figcaption */
  @Input() imageFigcaption: string;

  /** Read more */
  readMore: boolean = false;

  /** Constructor */
  constructor() {}
}
