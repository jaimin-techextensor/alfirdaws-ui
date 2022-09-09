import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/core/user/user.types';


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnInit {
    user: User;

   
    constructor(
        private _router: Router    ) {
        let user: any = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.user = new User();
            this.user = user;
            this.user.status = "online";
        }
    }

    ngOnInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Update the user status
     *
     * @param status
     */
     updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }
        /* Update the user
        this._userService.update({
            ...this.user,
            status
        }).subscribe();*/
    }


    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
}
