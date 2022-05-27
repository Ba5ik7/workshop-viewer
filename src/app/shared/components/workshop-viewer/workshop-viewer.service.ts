import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshopViewerService {
  private cache: Record<string, Observable<string>> = {};

  constructor(private http: HttpClient) { }

  fetchWorkshop(url: string): Observable<string> {
    if (this.cache[url]) {
      return this.cache[url];
    }

    const stream = this.http.get(url, {responseType: 'text'}).pipe(shareReplay(1));
    return stream.pipe(tap(() => this.cache[url] = stream));
  }
}
