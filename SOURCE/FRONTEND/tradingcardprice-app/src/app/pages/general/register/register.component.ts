import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponseStatus, User, UserRank } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  /** Return url */
  returnUrl: string;

  /** Register form group */
  registerFormGroup: FormGroup;

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

    this.registerFormGroup = this.formBuilder.group(
      {
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        username: [
          null,
          [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9]+'),
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        password: [null, Validators.required],
        repeatPassword: [null, Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  /** Check passwords */
  checkPasswords(group: FormGroup) {
    return group.get('password').value === group.get('repeatPassword').value
      ? null
      : { notSame: true };
  }

  /** Register */
  async register() {
    if (this.registerFormGroup.valid) {
      const res = await this.authService.register(
        this.registerFormGroup.get('email').value,
        this.registerFormGroup.get('username').value,
        this.registerFormGroup.get('password').value
      );
      if (res.status === IResponseStatus.success) {
        if (res.data) {
          const user = res.data as User;
          if (user.rank === UserRank.admin) {
            this.snackBarService.openDefaultSnackBar('register-messages.success');
            this.registerFormGroup.reset();
            this.router.navigateByUrl(this.returnUrl).then();
          } else {
            this.needVerification = true;
          }
        }
      } else if (res.status === IResponseStatus.error) {
        this.snackBarService.openDefaultSnackBar('register-messages.error');
      }
    }
  }
}
