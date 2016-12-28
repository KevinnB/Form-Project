import { AuthProviders } from 'angularfire2';

export class ApplicationSettings {
    AllowedAuthProviders: Array<AuthProviders> = [
        AuthProviders.Google
    ];
    
}