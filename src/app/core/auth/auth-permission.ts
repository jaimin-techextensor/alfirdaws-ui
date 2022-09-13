export function getModule(route: string) {
    if (route.includes('role') || route.includes('settings') || route.includes('user')) {
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
                modulePermissions.forEach(module_permission => {
                    if (type == 'delete' && module_permission.delete) {
                        valid = true;
                    } else if (type == 'edit' && module_permission.update) {
                        valid = true;
                    } else if (type == 'add' && module_permission.create) {
                        valid = true;
                    }
                });
            }
        }
        return valid;
    }
}