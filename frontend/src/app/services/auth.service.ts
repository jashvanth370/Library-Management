import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginDto, LoginResponse, RegisterDto } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  
  public isAuthenticated: WritableSignal<boolean> = signal(false);
  public currentUserId: WritableSignal<number | null> = signal(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  private checkToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      this.isAuthenticated.set(!!token);
      this.decodeAndSetUser(token);
    }
  }

  private decodeAndSetUser(token: string | null) {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        // Extract user ID from the NameIdentifier claim typically used by .NET
        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] 
                    || decodedToken.nameid || decodedToken.sub;
        this.currentUserId.set(userId ? parseInt(userId, 10) : null);
      } catch (error) {
        console.error('Invalid token format');
        this.currentUserId.set(null);
      }
    } else {
      this.currentUserId.set(null);
    }
  }

  login(dto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dto).pipe(
      tap(res => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
          this.isAuthenticated.set(true);
          this.decodeAndSetUser(res.token);
        }
      })
    );
  }

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.isAuthenticated.set(false);
      this.decodeAndSetUser(null);
      this.router.navigate(['/login']);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
}
