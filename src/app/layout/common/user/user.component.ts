import { BooleanInput } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { PageRequestModel } from 'app/modules/settings/users/page-request';
import { UsersService } from 'app/service/users.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user'
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User = new User();
    userName: string;
    email: string;
    userPicture: string;
    userListModel: PageRequestModel = new PageRequestModel();
    searchTextForModerator: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    userList: any[] = [];
    picture;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef,
        private _usersService: UsersService
    ) {
        let user: any = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.user = new User();
            this.email = user.token.email;
            this.userName = user.token.userName;
            if (user.token.picture) {
                let objectURL = user.token.picture;
                this.picture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }
        }


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                console.log('user:', this.user);
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
           // this.userPicture = ''
    }

    ngAfterViewInit() {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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

        // Update the user
        this._userService.update({
            ...this.user,
            status
        }).subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
}
