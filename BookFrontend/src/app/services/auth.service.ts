import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:5117/api/Auth';
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, user).pipe(
      tap(response => {
        if (response.token) {
          this.isAuthenticated = true;
          this.saveToken(response.token);
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
