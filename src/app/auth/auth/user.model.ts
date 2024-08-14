export class User {
    constructor(public email: string, public id: string , private _token: string, private _tokenExpirtationDate: Date) {}

    get token() {
        if (!this._tokenExpirtationDate || new Date() > this._tokenExpirtationDate) {
            return null;
        }
        return this._token;
    }
}
