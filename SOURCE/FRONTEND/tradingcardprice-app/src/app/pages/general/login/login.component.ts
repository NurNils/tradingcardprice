import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { IResponseStatus, User, UserRank } from '../../../interfaces';
import { SnackBarService } from '../../../services/snack-bar/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /** Return url */
  returnUrl: string;

  /** Login form group */
  loginFormGroup: FormGroup;

  /** Verification */
  needVerification: boolean;

  /** Constructor */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {}

  /** Initialize form */
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';

    this.loginFormGroup = this.formBuilder.group({
      usernameOrEmail: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      ],
      password: [null, Validators.required],
    });
  }

  /** Login */
  async login() {
    if (this.loginFormGroup.valid) {
      const res = await this.authService.login(
        this.loginFormGroup.get('usernameOrEmail').value,
        this.loginFormGroup.get('password').value
      );
      if (res.status === IResponseStatus.success) {
        if (res.data) {
          const user = res.data as User;
          if (user.rank === UserRank.admin) {
            this.snackBarService.openSuccessSnackBar('login-messages.success');
            this.loginFormGroup.reset();
            this.router.navigateByUrl(this.returnUrl).then();
          } else {
            this.needVerification = true;
          }
        }
      }
    }
  }
}
