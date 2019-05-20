import { PreloadingStrategy, Route } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        if (route.data && route.data.preload) {
            console.log('preload ' + route.path);
            return load();
        }
        return of(null);
    }
}