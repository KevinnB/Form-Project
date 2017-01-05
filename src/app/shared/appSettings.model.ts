import { AuthProviders } from 'angularfire2';

export class ApplicationSettings {
    readonly AllowedAuthProviders: Array<AuthProviders> = [
        AuthProviders.Google,
        AuthProviders.Facebook
    ];
    readonly ApplicationPaging: {
        pageSize: 25
    };
    
}