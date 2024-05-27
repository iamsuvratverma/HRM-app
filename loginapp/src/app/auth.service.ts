import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    // Check if the JWT token is present in session storage
    return !!sessionStorage.getItem('jwtToken');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:9992/student/login', { email, password })
      .pipe(
        // Assuming the server responds with a JWT token upon successful login
        tap(response => {
          if (response && response.token) {
            // Store the JWT token in session storage
            sessionStorage.setItem('jwtToken', response.token);
          }
        })
      );
  }
  
  register(userData: any): Observable<any> {
    return this.http.post<any>('http://localhost:9992/register', userData);
  }

  getUserDetails(email: string): Observable<any> {
    return this.http.get<any>('http://localhost:9992/userDetails', { params: { email } });
  }

  saveLoginTime(loginTime: string): Observable<any> {
    return this.http.post<any>('http://localhost:9992/saveLoginTime', { loginTime });
  }

  savecheckintm(checkintm: string): Observable<any> {
    return this.http.post<any>('http://localhost:9992/savecheckintm', { checkintm });
  }

  savecheckindate(checkindate: string): Observable<any> {
    return this.http.post<any>('http://localhost:9992/savecheckindate', { checkindate });
  }
  saveLogoutTime(logoutTime: string): Observable<any> {
    return this.http.post<any>('http://localhost:9992/saveLogoutTime', { logoutTime });
  }

  saveLogoutDate(logoutDate: string): Observable<any> {
    return this.http.post<any>('http://localhost:9992/saveLogoutDate', { logoutDate });
  }

  savecheckout(checkout: string): Observable<any> {
    return this.http.post<any>('http://localhost:9992/savecheckout', { checkout });
  }

  clearSession(): void {
    // Clear session storage on client-side
    sessionStorage.clear();
  }
}
