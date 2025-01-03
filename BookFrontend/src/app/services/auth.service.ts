import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:5117/api/Auth';
  private isAuthenticated = false;
  private sessionExpiredSubject = new BehaviorSubject<boolean>(false);
  private manualLogoutSubject = new BehaviorSubject<boolean>(false);

  sessionExpired$ = this.sessionExpiredSubject.asObservable();
   manualLogout$ = this.manualLogoutSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, user).pipe(
      tap((response) => {
        if (response.token) {
          this.isAuthenticated = true;
          this.saveToken(response.token);
          this.setTokenTimeout(15*60*1000);
          this.resetFlags();
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.manualLogoutSubject.next(true);
    this.router.navigate(['/login']);
  }
        
  sessionTimeout(): void {
    this.isAuthenticated = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.sessionExpiredSubject.next(true);
    this.router.navigate(['/login']);
  }


  checkAuthentication(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
    }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private setTokenTimeout(milliseconds: number): void {
    setTimeout(() => {
      this.sessionTimeout();      
    }, milliseconds);
  }

  private resetFlags(): void {
    this.sessionExpiredSubject.next(false);
    this.manualLogoutSubject.next(false);
  }
}
