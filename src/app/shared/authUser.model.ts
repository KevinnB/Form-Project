import * as firebase from 'firebase';

export class AuthUser implements firebase.UserInfo {
    displayName: string|null;
    email: string|null;
    photoURL: string|null;
    providerId: string;
    uid: string;
    joined: number;
    updated: number;
    roles: Array<any>;
    firebaseData: any;

    constructor(firebaseAuthInfo: firebase.User, dbAuthInfo: any) { 
        this.displayName = firebaseAuthInfo.displayName;
        this.email = firebaseAuthInfo.email;
        this.photoURL = firebaseAuthInfo.photoURL;
        this.providerId = firebaseAuthInfo.providerId;
        this.uid = firebaseAuthInfo.uid;
        this.joined = dbAuthInfo.joined;
        this.updated = dbAuthInfo.updated;
        this.roles = dbAuthInfo.roles
        // Store all other info in this area so we can use it later
        this.firebaseData = firebaseAuthInfo;
    }
}