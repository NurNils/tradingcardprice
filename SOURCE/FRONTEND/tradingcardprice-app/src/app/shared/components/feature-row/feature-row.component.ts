import { Component, Input } from '@angular/core';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-feature-row',
  templateUrl: './feature-row.component.html',
  styleUrls: ['./feature-row.component.scss'],
})
export class FeatureRowComponent {
  /** Icon Feature 1 */
  @Input() icon1: string;

  /** Title Feature 1 */
  @Input() title1: string;

  /** Description Feature 1 */
  @Input() description1: string;

  /** Icon Feature 2 */
  @Input() icon2: string;

  /** Title Feature 2 */
  @Input() title2: string;

  /** Description Feature 2 */
  @Input() description2: string;

  /** Icon Feature 3 */
  @Input() icon3: string;

  /** Title Feature 3 */
  @Input() title3: string;

  /** Description Feature 3 */
  @Input() description3: string;

  /** YouTube name */
  youTube = env.socialMedia.youTube;

  /** Twitch name */
  twitch = env.socialMedia.twitch;

  /** Instagram name */
  instagram = env.socialMedia.instagram;

  /** Constructor */
  constructor() {}
}
