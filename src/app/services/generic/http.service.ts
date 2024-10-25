import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})


export abstract class HttpService {
    protected _http = inject(HttpClient)
    private baseUrl = `${environment.API_PATH}`;
    protected postsEndpoint = '/posts';
    protected usersEndpoint = '/users';


    protected getUrl(path: string) {
        return `${this.baseUrl}${path} `
    }
}