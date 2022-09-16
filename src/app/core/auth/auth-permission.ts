export function getModule(route: string) {
    if (route.includes('role') || route.includes('settings') || route.includes('user') || route.includes('categories') || route.includes('category') || route.includes('countries')
        || route.includes('country')) {
        return 'Settings';
    } else if (route.includes('dashboard')) {
        return 'Dashboard';
    } else if (route.includes('search')) {
        return 'Search Engine';
    }
}

export function checkValidPermission(route: string, type: string) {
    var valid = false;
    var permissions: any = localStorage.getItem('role-permissions');
    if (permissions) {
        permissions = JSON.parse(permissions);
        const module = getModule(route);
        if (module) {
            if (permissions.filter(a => a.moduleName == module)?.length > 0) {
                var modulePermissions = permissions.filter(a => a.moduleName == module);
                if (type == 'delete') {
                    if (modulePermissions.filter(a => a.delete).length > 0) {
                        valid = true;
                    }
                } else if (type == 'edit') {
                    if (modulePermissions.filter(a => a.update).length > 0) {
                        valid = true;
                    }
                } else if (type == 'add') {
                    if (modulePermissions.filter(a => a.create).length > 0) {
                        valid = true;
                    }
                }
            }
        }
        return valid;
    }
}