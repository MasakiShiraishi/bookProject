import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:5117/api/Auth';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, user);
  }
}
