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
}