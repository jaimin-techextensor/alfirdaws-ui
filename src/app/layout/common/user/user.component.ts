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
    user: User = new User();
    searchTextForModerator: any;
    constructor(
        private _router: Router    ) {
        let user: any = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.user = new User();
            this.user = user;
        }
    }

    ngOnInit(): void {
    }

    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
}
