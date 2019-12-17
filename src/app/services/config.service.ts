import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../interfaces/config.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private config: Config;
    private initialised = false;
    private readonly darkMode: boolean;

    constructor(private http: HttpClient) {
        this.darkMode = window.localStorage.getItem('darkMode') === 'true';
        window.localStorage.setItem('darkMode', (!this.darkMode).toString());
    }

    public init() {
        // Guard for multiple init calls
        if (this.initialised) { return; }
        this.initialised = true;

        // You would replace this with something like
        // return http.get('someUrl');
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate different environments
                if (this.darkMode) {
                    this.config = {
                        stylesUrl: '/assets/themes/dark.css',
                        'background-color': '#2c3e50',
                        'primary': 'white',
                        'secondary': '#95a5a6',
                    };
                } else {
                    this.config = {
                        stylesUrl: '/assets/themes/light.css',
                        'background-color': '#ecf0f1',
                        'primary': '#7f8c8d',
                        'secondary': '#34495e',
                    };
                }

                const link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = this.config.stylesUrl;
                link.onload = () => resolve(); // This is okay as the styles are stored on the same servers so it should always be up
                document.head.appendChild(link);
            }, 500);
        });
    }

    public get(key: string) {
        return this.config[key];
    }

}
