import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = environment; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Method to make GET request
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl.apiUrl}/index`);
  }

  capture(name: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl.apiUrl}/capture`,
      {
        headers: { 'Content-Type': 'application/json' },
        params: {
          name: name
        }
      }
    );
  }

  captured(): Observable<any>{
    return this.http.get(`${this.apiUrl.apiUrl}/captured`);
  }

  destroy(name: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl.apiUrl}/`,
      {
        headers: { 'Content-Type': 'application/json' },
        params: {
          name: name
        }
      }
    );
  }

  search(searchString: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl.apiUrl}/search_pokemon`,
      {
        headers: { 'Content-Type': 'application/json' },
        params: {
          search: searchString
        }
      }
    );
  }
}