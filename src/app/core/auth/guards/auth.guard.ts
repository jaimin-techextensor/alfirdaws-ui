import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { getModule } from '../auth-permission';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        const redirecURL = segments.reduce((path, currentSegment) => {
            return `${path}/${currentSegment.path}`;
        }, '');
        return this._checkCanLoad(redirecURL);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param redirectURL
     * @private
     */
    private _check(redirectURL: string): Observable<boolean> {
        // Check the authentication status
        return this._authService.check()
            .pipe(
                switchMap((authenticated) => {

                    // If the user is not authenticated...
                    //    if ( !authenticated )
                    //    {
                    //        // Redirect to the sign-in page
                    //        this._router.navigate(['sign-in'], {queryParams: {redirectURL}});

                    //        // Prevent the access
                    //        return of(false);
                    //    }

                    // Allow the access
                    return of(true);
                })
            );
    }

    private _checkCanLoad(redirectURL: string): Observable<boolean> {
        var valid = false;
        if (this._check(redirectURL)) {
            var permissions: any = localStorage.getItem('role-permissions');
            if (permissions) {
                permissions = JSON.parse(permissions);
                const module = getModule(redirectURL);
                if (module) {
                    if (permissions.filter(b => b.moduleName == module)?.length > 0) {
                        var modulePermissions = permissions.filter(b => b.moduleName == module);
                        if (redirectURL.includes('add')) {
                            if (modulePermissions.filter(a => a.create).length > 0) {
                                valid = true;
                            }
                        } else if (redirectURL.includes('edit')) {
                            if (modulePermissions.filter(a => a.update).length > 0) {
                                valid = true;
                            }
                        } else {
                            if (modulePermissions.filter(a => a.read).length > 0) {
                                valid = true;
                            }
                        }
                    }
                }
            }
        }
        if (!valid) {
            this._router.navigate(['/dashboard']);
        }
        return of(valid);
    }
}
