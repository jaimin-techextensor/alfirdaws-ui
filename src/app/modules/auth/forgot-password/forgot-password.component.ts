import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;
    submitAttempt: boolean = false;

    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder
    ) {
    }

    ngOnInit(): void {

        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    sendResetLink() {
        debugger;
        this.submitAttempt = true;
        if (this.forgotPasswordForm.valid) {
            const data = {
                email: this.forgotPasswordForm.value.email
            }
            this._authService.forgotPassword(data).subscribe(
                (data) => {
                    this.alert = {
                        type: 'success',
                        message: 'Password reset sent! You\'ll receive an email if you are registered on our system.'
                    };
                    this.forgotPasswordForm.reset();
                    this.submitAttempt = false;
                }, (error) => {
                    debugger
                    this.alert={
                        type: 'error',
                        message: 'Email does not found! Are you sure you are already a member?'
                    };
                })
        }
    }
}
