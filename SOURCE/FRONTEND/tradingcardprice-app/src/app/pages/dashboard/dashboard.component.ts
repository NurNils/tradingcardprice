import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponseStatus } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** Constructor */
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  /** Logout */
  async logout() {
    const res = await this.authService.logout();
    if (res.status === IResponseStatus.success) {
      this.router.navigateByUrl('/login').then();
      this.snackBarService.openSuccessSnackBar('logout-messages.success');
    } else {
      this.snackBarService.openErrorSnackBar('logout-messages.error');
    }
  }
}
