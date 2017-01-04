import * as firebase from 'firebase';
import { AuthService } from './auth.service';

export class AuthUser implements firebase.UserInfo {
    displayName: string|null;
    email: string|null;
    photoURL: string|null;
    providerId: string;
    uid: string;
    joined: number;
    updated: number;
    roles: Array<any> = [];
    providers: Array<any> = [];
    firebaseData: any;

    constructor(firebaseAuthInfo: firebase.User, 
                dbAuthInfo: any,
                lookupFn: Function) { 
        // Firebase Auth information
        this.displayName = firebaseAuthInfo.displayName;
        this.email = firebaseAuthInfo.email;
        this.photoURL = firebaseAuthInfo.photoURL;
        this.providerId = firebaseAuthInfo.providerId;
        this.uid = firebaseAuthInfo.uid;

        for(var i = 0; i < firebaseAuthInfo.providerData.length; i++) {
            var fbProviderData = firebaseAuthInfo.providerData[i];
            var provider = lookupFn(fbProviderData.providerId);
            this.providers.push(provider);
        }

        // From our user table
        this.joined = dbAuthInfo.joined;
        this.updated = dbAuthInfo.updated;
        this.roles = dbAuthInfo.roles
        // Store all other info in this area so we can use it later
        this.firebaseData = firebaseAuthInfo;
    }

    hasProvider(id: Number): boolean {
        for(var i = 0; i < this.providers.length; i++) {
            if(this.providers[i].af_provider === id) {
                return true;
            }
        }
        return false;
    }
}