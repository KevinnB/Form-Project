import { PermissionEntry } from './permissionEntry.model';

export class Permission {
    roles: Array<PermissionEntry>;
    itemId: string;

    constructor(itemId: string) {
        this.itemId = itemId;
        this.roles = [];
    }

    addRole(role: PermissionEntry) {
        this.roles.push(role);
    }

    hasRole(role: PermissionEntry) {
      return this.roles.indexOf(role) > -1
    }
}