import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
    baseUrl = environment.authApiUrl;

    private jwt() {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = {
            headers: httpHeaders
        };
        return options;
    }

    constructor(private httpClient: HttpClient) { }

    login(body) {
        console.log("Logging in")
        let url = this.baseUrl + "/tokens/login";
        return this.httpClient.post(url, body, this.jwt())
            .do(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
            });
    }

    validate(user) {
        console.log("Validating")
        let url = this.baseUrl + "/tokens/validate";
        return this.httpClient.post(url, user, this.jwt())
            .do(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
            });
    }
    sendOtp(email: string): Observable<string> {
        const body = { email };
        return this.httpClient.post<string>(`${this.baseUrl}/tokens/send`, body, this.jwt());
      }
    
      // Verify OTP
      verifyOtp(email: string, otp: string): Observable<string> {
        const body = { email, otp };
        return this.httpClient.post(`${this.baseUrl}/tokens/verify`, body, {
            headers: this.jwt().headers,
            responseType: 'text' // Expect plain text, not JSON
        });
    }
    
    
      // Reset Password
      resetPassword(email: string, newPassword: string): Observable<string> {
        const body = { email, newPassword };
      
        // Explicitly cast response to Observable<string>
        return this.httpClient.post(`${this.baseUrl}/tokens/reset`, body, {
          ...this.jwt(),
          responseType: 'text'
        }) as Observable<string>;
      }
    }      