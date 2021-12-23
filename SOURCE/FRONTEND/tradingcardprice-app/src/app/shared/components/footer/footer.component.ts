import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environment.default';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  /** App name */
  appName = env.appName;

  /** Company name */
  company = env.company;

  /** Company email */
  email = env.email;

  /** Constructor */
  constructor() {}
}
