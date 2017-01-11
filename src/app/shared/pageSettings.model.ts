import { AuthProviders } from 'angularfire2';

export class PageSettings {
    _loading: boolean = false;
    _error: boolean = false;
    _message: string = "";

    stopLoading(message?: string) {
        this._reset();
        this._message = message || "";
    }

    startLoading(message?: string) {
        this._reset();
        this._loading = true;
        this._message = message || "";
    }

    error(message: string) {
        this._loading = false;
        this._error = true;
        this._message = message;
    }

    _reset() {
        this._loading = false;
        this._error = false;
        this._message = "";
    }

    constructor(loading: boolean, message?: string) {
        this._loading = loading;
        this._message = message || "";
    }
}