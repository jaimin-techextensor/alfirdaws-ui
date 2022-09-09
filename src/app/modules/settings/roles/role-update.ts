export class RoleUpdateRequest {
    public RoleId?: number;
    public Name: string;
    public IsStatic: boolean;
    public Description: string;
    public Permissions: Array<PermissionUpdateRequest> = [];
}

export class PermissionUpdateRequest {
    public PermissionId?: number;
    public ModuleId?: number;
    public Create: boolean;
    public Read: boolean;
    public Update: boolean
    public Delete: boolean;
}